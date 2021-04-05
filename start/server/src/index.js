const { ApolloServer } = require("apollo-server");
require("dotenv").config();
const typeDefs = require("./schema");
const { createStore } = require("./utils");
const resolvers = require("./resolvers");

const LaunchAPI = require("./datasources/launch");
const UserAPI = require("./datasources/user");

const store = createStore();
const SECRET_KEY = "HOLA"

const context = async ({ req }) => {
  return {
    req
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
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
