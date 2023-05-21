/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getUserProfile {\n    userProfile {\n      id\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n      profilePicture\n      profileCompleted\n    }\n  }\n": types.GetUserProfileDocument,
    "\n  query getProfiles {\n    profiles {\n      id\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n    }\n  }\n": types.GetProfilesDocument,
    "\n  query Posts {\n    posts {\n      id\n      profileId\n      description\n      createDate\n      modifyDate\n      profile {\n        firstName\n        lastName\n        location\n        occupation\n        gender\n        birthday\n        profilePicture\n      }\n    }\n  }\n": types.PostsDocument,
    "\nquery FollowingPosts($followingPostsProfileId2: String!) {\n  followingPosts(profileId: $followingPostsProfileId2) {\n    id\n    profileId\n    description\n    createDate\n    modifyDate\n    profile {\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n      profilePicture\n    }\n  }\n}\n": types.FollowingPostsDocument,
    "\n  mutation CreatePost($profileId: String!, $description: String!) {\n    createPost(profileId: $profileId, description: $description) {\n      id\n      description\n      profileId\n      createDate\n      modifyDate\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n": types.LoginDocument,
    "\n  mutation logout {\n    logout {\n      email\n      id\n    }\n  }\n": types.LogoutDocument,
    "\n  mutation CreateProfile(\n    $firstName: String!\n    $lastName: String!\n    $location: String!\n    $occupation: String!\n    $gender: String!\n    $birthday: Date!\n  ) {\n    createProfile(\n      firstName: $firstName\n      lastName: $lastName\n      location: $location\n      occupation: $occupation\n      gender: $gender\n      birthday: $birthday\n    ) {\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n    }\n  }\n": types.CreateProfileDocument,
    "\n  mutation CompleteProfile($profilePicture: String!) {\n    completeProfile(profilePicture: $profilePicture) {\n      id\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n      profilePicture\n      profileCompleted\n    }\n  }\n": types.CompleteProfileDocument,
    "\n  mutation signup($email: String!, $password: String!) {\n    signUp(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n": types.SignupDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserProfile {\n    userProfile {\n      id\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n      profilePicture\n      profileCompleted\n    }\n  }\n"): (typeof documents)["\n  query getUserProfile {\n    userProfile {\n      id\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n      profilePicture\n      profileCompleted\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getProfiles {\n    profiles {\n      id\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n    }\n  }\n"): (typeof documents)["\n  query getProfiles {\n    profiles {\n      id\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Posts {\n    posts {\n      id\n      profileId\n      description\n      createDate\n      modifyDate\n      profile {\n        firstName\n        lastName\n        location\n        occupation\n        gender\n        birthday\n        profilePicture\n      }\n    }\n  }\n"): (typeof documents)["\n  query Posts {\n    posts {\n      id\n      profileId\n      description\n      createDate\n      modifyDate\n      profile {\n        firstName\n        lastName\n        location\n        occupation\n        gender\n        birthday\n        profilePicture\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery FollowingPosts($followingPostsProfileId2: String!) {\n  followingPosts(profileId: $followingPostsProfileId2) {\n    id\n    profileId\n    description\n    createDate\n    modifyDate\n    profile {\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n      profilePicture\n    }\n  }\n}\n"): (typeof documents)["\nquery FollowingPosts($followingPostsProfileId2: String!) {\n  followingPosts(profileId: $followingPostsProfileId2) {\n    id\n    profileId\n    description\n    createDate\n    modifyDate\n    profile {\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n      profilePicture\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePost($profileId: String!, $description: String!) {\n    createPost(profileId: $profileId, description: $description) {\n      id\n      description\n      profileId\n      createDate\n      modifyDate\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($profileId: String!, $description: String!) {\n    createPost(profileId: $profileId, description: $description) {\n      id\n      description\n      profileId\n      createDate\n      modifyDate\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation logout {\n    logout {\n      email\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation logout {\n    logout {\n      email\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateProfile(\n    $firstName: String!\n    $lastName: String!\n    $location: String!\n    $occupation: String!\n    $gender: String!\n    $birthday: Date!\n  ) {\n    createProfile(\n      firstName: $firstName\n      lastName: $lastName\n      location: $location\n      occupation: $occupation\n      gender: $gender\n      birthday: $birthday\n    ) {\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProfile(\n    $firstName: String!\n    $lastName: String!\n    $location: String!\n    $occupation: String!\n    $gender: String!\n    $birthday: Date!\n  ) {\n    createProfile(\n      firstName: $firstName\n      lastName: $lastName\n      location: $location\n      occupation: $occupation\n      gender: $gender\n      birthday: $birthday\n    ) {\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CompleteProfile($profilePicture: String!) {\n    completeProfile(profilePicture: $profilePicture) {\n      id\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n      profilePicture\n      profileCompleted\n    }\n  }\n"): (typeof documents)["\n  mutation CompleteProfile($profilePicture: String!) {\n    completeProfile(profilePicture: $profilePicture) {\n      id\n      firstName\n      lastName\n      location\n      occupation\n      gender\n      birthday\n      profilePicture\n      profileCompleted\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation signup($email: String!, $password: String!) {\n    signUp(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation signup($email: String!, $password: String!) {\n    signUp(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;