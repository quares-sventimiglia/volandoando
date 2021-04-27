const { paginateResults } = require("./utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function generateToken(user, SECRET_KEY) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

function formatErrors(error, otherErrors) {
  const errors = error.errors;

  if (errors) {
    const parsedErrors = errors.map((error) => {
      return {
        path: error.path,
        message: error.message,
      };
    });
    return otherErrors.concat(parsedErrors);
  } else {
    return otherErrors;
  }
}

module.exports = {
  Query: {
    launches: async (
      _,
      { pageSize = 20, after },
      { dataSources, userToken }
    ) => {
      if (!userToken) return null;
      const allLaunches = await dataSources.launchAPI.getAllLaunches();
      allLaunches.reverse();
      const launches = paginateResults({
        after,
        pageSize,
        results: allLaunches,
      });
      return {
        launches,
        user: userToken,
        cursor: launches.length ? launches[launches.length - 1].cursor : null,
        hasMore: launches.length
          ? launches[launches.length - 1].cursor !==
            allLaunches[allLaunches.length - 1].cursor
          : false,
      };
    },
    // )
    launch: (_, { id }, { dataSources, userToken }) => {
      if (!userToken) return null;
      return dataSources.launchAPI.getLaunchById({ launchId: id });
    },
    me: async (_, __, { userToken }) => {
      if (!userToken) return null;

      return userToken;
    },
    getAllLaunches: async (_, __, { dataSources, userToken }) => {
      const launchesId = await dataSources.userAPI.getLaunchesId(userToken.id);
      const launches = await dataSources.launchAPI.getLaunchesByIds({
        launchIds: launchesId,
      });
      return launches;
    },
  },
  Mutation: {
    login: async (_, { email, password }, { dataSources, SECRET_KEY }) => {
      const otherErrors = [];
      try {
        const user = await dataSources.userAPI.findUser(email);
        if (!user) {
          otherErrors.push({
            path: "email",
            message: "The email doen't exist",
          });
        }
        const passwordMatch = await bcrypt.compare(
          password,
          user.dataValues.password
        );

        if (!passwordMatch) {
          otherErrors.push({
            path: "password",
            message: "Password incorrect",
          });
        }

        if (otherErrors.length) {
          throw otherErrors;
        }

        const token = generateToken(user, SECRET_KEY);

        const finalUser = {
          ...user.dataValues,
          token,
        };
        return {
          success: finalUser && finalUser.id,
          token: token,
          errors: [],
        };
      } catch (error) {
        return {
          success: false,
          errors: formatErrors(error, otherErrors),
        };
      }
    },
    createUser: async (_, { email, password, name }, { dataSources }) => {
      const otherErrors = [];
      try {
        if (password.length < 4 || password.length > 16) {
          otherErrors.push({
            path: "password",
            message: "Long invalid has to be between 4 and 16 characters",
          });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await dataSources.userAPI.createUser({
          email,
          password: hashedPassword,
          name,
        });
        if (otherErrors.length) {
          throw otherErrors;
        }
        return {
          success: user && user.id,
          errors: [],
        };
      } catch (error) {
        return {
          success: false,
          errors: formatErrors(error, otherErrors),
        };
      }
    },
    addToCart: async (_, { launchId }, { dataSources, userToken }) => {
      if (!userToken) return null;

      const isLaunchAdded = await dataSources.userAPI.addLaunch({
        launchId,
        userId: userToken.id,
      });

      if (!isLaunchAdded) {
        return {
          success: false,
          message: "failed to add trip, you can't add the same trip",
        };
      }
      return {
        success: true,
        message: "trip added",
      };
    },
    removeToCart: async (_, { launchId }, { dataSources, userToken }) => {
      const wasDeleted = await dataSources.userAPI.removeLaunch({
        userId: userToken.id,
        launchId,
      });

      if (!wasDeleted)
        return {
          success: false,
          message: "launch doesn't exist",
        };

      return {
        success: true,
        message: "launch deleted",
      };
    },
    bookAll: async (_, __, { dataSources, userToken }) => {
      const wasDeleted = await dataSources.userAPI.removeAllLaunches({
        userId: userToken.id,
      });

      if (!wasDeleted)
        return {
          success: false,
          message: "launch doesn't exist",
        };

      return {
        success: true,
        message: "book all",
      };
    },
  },
  Mission: {
    missionPatch: (mission, { size } = { size: "SMALL" }) => {
      return size === "LARGE"
        ? mission.missionPatchSmall
        : mission.missionPatchLarge;
    },
  },
  Launch: {
    isBooked: async (launch, _, { dataSources }) =>
      dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
  },
  User: {
    trips: async (_, __, { dataSources }) => {
      // get ids of launches by user
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser();
      if (!launchIds.length) return [];
      // look up those launches by their ids
      return (
        dataSources.launchAPI.getLaunchesByIds({
          launchIds,
        }) || []
      );
    },
  },
};
