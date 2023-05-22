import { gql } from "@apollo/client";

gql`
  query getUserProfile {
    userProfile {
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
  query getProfile($profileId: String!) {
    profile(profileId: $profileId) {
      id
      firstName
      lastName
      location
      occupation
      gender
      birthday
      profilePicture
      profileCompleted
      posts {
        id
        profileId
        description
        createDate
        modifyDate
      }
    }
  }
`;

gql`
  query getProfiles {
    profiles {
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
  query getPosts {
    posts {
      id
      profileId
      description
      createDate
      modifyDate
      profile {
        firstName
        lastName
        location
        occupation
        gender
        birthday
        profilePicture
      }
    }
  }
`;

gql`
  query getFollowingPosts($profileId: String!) {
    followingPosts(profileId: $profileId) {
      id
      profileId
      description
      createDate
      modifyDate
      profile {
        firstName
        lastName
        location
        occupation
        gender
        birthday
        profilePicture
      }
    }
  }
`;
