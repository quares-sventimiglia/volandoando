const { ApolloServer } = require("apollo-server");
require("dotenv").config();
const typeDefs = require("./schema");
const { createStore } = require("./utils");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");

const LaunchAPI = require("./datasources/launch");
const UserAPI = require("./datasources/user");

const store = createStore();
const SECRET_KEY = "SOY UN SECRETO";

const context = async ({ req: { headers } }) => {

  const context = {
    SECRET_KEY,
    userToken: "",
  };
  try {
    const token = headers.authorization;
    if (token) {
      context.userToken = await jwt.verify(token, SECRET_KEY);
    }
    return context;
  } catch (e) {
    
  }
  return context
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: true,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store }),
  }),
});

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/dev
  `);
});
