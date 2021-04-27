const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    launches(pageSize: Int, after: String): LaunchConnection!
    launch(id: ID!): Launch
    me: User
    getAllLaunches: [Launch]
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
    user: User
  }

  type Response {
    success: Boolean!
    token: String
    errors: [Error]
  }

  type Error {
    path: String!
    message: String!
  }

  type Mutation {
    login(email: String!, password: String!): Response!
    createUser(email: String!, password: String!, name: String!): Response!
    addToCart(launchId: ID!): TripUpdateResponse
    removeToCart(launchId: ID!): TripUpdateResponse!
    bookAll: TripUpdateResponse!
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID
    email: String
    trips: [Launch]
    token: String
    name: String
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

module.exports = typeDefs;
