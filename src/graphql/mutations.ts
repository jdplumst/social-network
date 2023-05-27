import { gql } from "@apollo/client";

gql`
  mutation signup($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      id
      email
    }
  }
`;

gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

gql`
  mutation logout {
    logout {
      email
      id
    }
  }
`;

gql`
  mutation createProfile(
    $firstName: String!
    $lastName: String!
    $location: String!
    $occupation: String!
    $gender: String!
    $birthday: Date!
  ) {
    createProfile(
      firstName: $firstName
      lastName: $lastName
      location: $location
      occupation: $occupation
      gender: $gender
      birthday: $birthday
    ) {
      firstName
      lastName
      location
      occupation
      gender
      birthday
    }
  }
`;

gql`
  mutation completeProfile($profilePicture: String!) {
    completeProfile(profilePicture: $profilePicture) {
      id
      firstName
      lastName
      location
      occupation
      gender
      birthday
      profilePicture
      profileCompleted
    }
  }
`;

gql`
  mutation createPost($profileId: String!, $description: String!) {
    createPost(profileId: $profileId, description: $description) {
      id
      description
      profileId
      createDate
      modifyDate
    }
  }
`;

gql`
  mutation createFollow($profileId: String!) {
    createFollow(profileId: $profileId) {
      profileId
      followerId
    }
  }
`;

gql`
  mutation deleteFollow($profileId: String!) {
    deleteFollow(profileId: $profileId) {
      profileId
      followerId
    }
  }
`;
