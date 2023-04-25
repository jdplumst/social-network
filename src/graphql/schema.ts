export const typeDefs = `#graphql
  scalar Date

  type Post {
    id: String
    profileId: String
    description: String
    createDate: Date
    modifyDate: Date
  }

  type Query {
    hello: String
  }
`;
