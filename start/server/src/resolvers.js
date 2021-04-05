const { paginateResults } = require("./utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = "HOLA";

function generateToken(user) {
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

module.exports = {
  Query: {
    launches: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allLaunches = await dataSources.launchAPI.getAllLaunches();
      allLaunches.reverse();
      const launches = paginateResults({
        after,
        pageSize,
        results: allLaunches,
      });
      return {
        launches,
        cursor: launches.length ? launches[launches.length - 1].cursor : null,
        hasMore: launches.length
          ? launches[launches.length - 1].cursor !==
            allLaunches[allLaunches.length - 1].cursor
          : false,
      };
    },
    launch: (_, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    me: (_, { email }, { dataSources }) => {
      dataSources.userAPI.findUser(email);
    },
    meById: async (_, { id }, { dataSources }) => {
      const user = await dataSources.userAPI.findUserById(id);
      return user
    },
  },
  Mutation: {
    login: async (_, { email, password }, { dataSources }) => {
      const user = await dataSources.userAPI.findUser(email);

      if (!user) {
        throw new Error("Email doesn't exist");
      }

      const passwordMatch = await bcrypt.compare(
        password,
        user.dataValues.password
      );

      if (!passwordMatch) {
        throw new Error("Password incorrect");
      }

      const token = generateToken(user);

      const finalUser = {
        ...user.dataValues,
        token,
      };

      return finalUser;
    },
    register: async (
      _,
      { registerInput: { name, email, password } },
      { dataSources }
    ) => {
      const didEmailExist = await dataSources.userAPI.findUser(email);

      if (didEmailExist) {
        throw new Error("The email was taken");
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const token = generateToken({
        email,
        name,
        password: hashedPassword,
      });

      console.log("token", token);

      const newUser = await dataSources.userAPI.createUser({
        email,
        name,
        token,
        password: hashedPassword,
      });

      const completedUserCreated = { ...newUser };

      return completedUserCreated;
    },
    bookTrips: async (_, { launchIds }, { dataSources }) => {
      const results = await dataSources.userAPI.bookTrips({ launchIds });
      const launches = await dataSources.launchAPI.getLaunchesByIds({
        launchIds,
      });

      return {
        success: results && results.length === launchIds.length,
        message:
          results.length === launchIds.length
            ? "trips booked successfully"
            : `the following launches couldn't be booked: ${launchIds.filter(
                (id) => !results.includes(id)
              )}`,
        launches,
      };
    },
    cancelTrip: async (_, { launchId }, { dataSources }) => {
      const result = await dataSources.userAPI.cancelTrip({ launchId });

      if (!result)
        return {
          success: false,
          message: "failed to cancel trip",
        };

      const launch = await dataSources.launchAPI.getLaunchById({ launchId });
      return {
        success: true,
        message: "trip cancelled",
        launches: [launch],
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
