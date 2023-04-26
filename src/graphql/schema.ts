export const typeDefs = `#graphql
  scalar Date

  type User {
    id: String
    email: String
    password: String
    profile: Profile
  }

  type Profile {
    id: String
    userId: String
    firstName: String
    lastName: String
    location: String
    occupation: String
    gender: String
    birthday: Date
    profilePicture: String
    profileCompleted: Boolean
    posts: [Post]
  }

  type Post {
    id: String
    profileId: String
    description: String
    createDate: Date
    modifyDate: Date
    comments: [Comment]
    likes: [Like]
  }

  type Comment {
    id: String
    profile: Profile
    post: Post
    description: String
    createDate: Date
    modifyDate: Date
  }

  type Like {
    id: String
    profile: Profile
    post: Post
  }

  type Query {
    user(id: String): User
    users: [User]
  }
`;
