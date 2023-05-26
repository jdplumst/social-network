/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Auth = {
  __typename?: 'Auth';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  createDate?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  modifyDate?: Maybe<Scalars['Date']>;
  post?: Maybe<Post>;
  profile?: Maybe<Profile>;
};

export type Follow = {
  __typename?: 'Follow';
  followerId?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['String']>;
};

export type Like = {
  __typename?: 'Like';
  id?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  profile?: Maybe<Profile>;
};

export type Mutation = {
  __typename?: 'Mutation';
  completeProfile: Profile;
  createFollow: Follow;
  createPost: Post;
  createProfile: Profile;
  login: Auth;
  logout?: Maybe<Auth>;
  signUp: Auth;
  updateProfile: Profile;
};


export type MutationCompleteProfileArgs = {
  profilePicture: Scalars['String'];
};


export type MutationCreateFollowArgs = {
  profileId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  description: Scalars['String'];
  profileId: Scalars['String'];
};


export type MutationCreateProfileArgs = {
  birthday: Scalars['Date'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  location: Scalars['String'];
  occupation: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  birthday?: InputMaybe<Scalars['Date']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  occupation?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  comments?: Maybe<Array<Maybe<Comment>>>;
  createDate: Scalars['Date'];
  description: Scalars['String'];
  id: Scalars['String'];
  likes?: Maybe<Array<Maybe<Like>>>;
  modifyDate: Scalars['Date'];
  profile?: Maybe<Profile>;
  profileId: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  birthday: Scalars['Date'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  location: Scalars['String'];
  occupation: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
  profileCompleted: Scalars['Boolean'];
  profilePicture: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  followingPosts?: Maybe<Array<Post>>;
  isFollowing?: Maybe<Scalars['Boolean']>;
  posts?: Maybe<Array<Post>>;
  profile?: Maybe<Profile>;
  profiles?: Maybe<Array<Maybe<Profile>>>;
  userProfile?: Maybe<Profile>;
};


export type QueryFollowingPostsArgs = {
  profileId: Scalars['String'];
};


export type QueryIsFollowingArgs = {
  followerId: Scalars['String'];
  profileId: Scalars['String'];
};


export type QueryProfileArgs = {
  profileId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signUp: { __typename?: 'Auth', id?: string | null, email?: string | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', id?: string | null, email?: string | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'Auth', email?: string | null, id?: string | null } | null };

export type CreateProfileMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  location: Scalars['String'];
  occupation: Scalars['String'];
  gender: Scalars['String'];
  birthday: Scalars['Date'];
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'Profile', firstName: string, lastName: string, location: string, occupation: string, gender: string, birthday: any } };

export type CompleteProfileMutationVariables = Exact<{
  profilePicture: Scalars['String'];
}>;


export type CompleteProfileMutation = { __typename?: 'Mutation', completeProfile: { __typename?: 'Profile', id: string, firstName: string, lastName: string, location: string, occupation: string, gender: string, birthday: any, profilePicture: string, profileCompleted: boolean } };

export type CreatePostMutationVariables = Exact<{
  profileId: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, description: string, profileId: string, createDate: any, modifyDate: any } };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'Query', userProfile?: { __typename?: 'Profile', id: string, firstName: string, lastName: string, location: string, occupation: string, gender: string, birthday: any, profilePicture: string, profileCompleted: boolean } | null };

export type GetProfileQueryVariables = Exact<{
  profileId: Scalars['String'];
}>;


export type GetProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', id: string, firstName: string, lastName: string, location: string, occupation: string, gender: string, birthday: any, profilePicture: string, profileCompleted: boolean, posts?: Array<{ __typename?: 'Post', id: string, profileId: string, description: string, createDate: any, modifyDate: any } | null> | null } | null };

export type GetProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfilesQuery = { __typename?: 'Query', profiles?: Array<{ __typename?: 'Profile', id: string, firstName: string, lastName: string, location: string, occupation: string, gender: string, birthday: any, profilePicture: string, profileCompleted: boolean } | null> | null };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id: string, profileId: string, description: string, createDate: any, modifyDate: any, profile?: { __typename?: 'Profile', firstName: string, lastName: string, location: string, occupation: string, gender: string, birthday: any, profilePicture: string } | null }> | null };

export type GetFollowingPostsQueryVariables = Exact<{
  profileId: Scalars['String'];
}>;


export type GetFollowingPostsQuery = { __typename?: 'Query', followingPosts?: Array<{ __typename?: 'Post', id: string, profileId: string, description: string, createDate: any, modifyDate: any, profile?: { __typename?: 'Profile', firstName: string, lastName: string, location: string, occupation: string, gender: string, birthday: any, profilePicture: string } | null }> | null };

export type GetIsFollowingQueryVariables = Exact<{
  profileId: Scalars['String'];
  followerId: Scalars['String'];
}>;


export type GetIsFollowingQuery = { __typename?: 'Query', isFollowing?: boolean | null };


export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const CreateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"occupation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gender"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"birthday"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"occupation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"occupation"}}},{"kind":"Argument","name":{"kind":"Name","value":"gender"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gender"}}},{"kind":"Argument","name":{"kind":"Name","value":"birthday"},"value":{"kind":"Variable","name":{"kind":"Name","value":"birthday"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}}]}}]}}]} as unknown as DocumentNode<CreateProfileMutation, CreateProfileMutationVariables>;
export const CompleteProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"completeProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profilePicture"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"profilePicture"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profilePicture"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"profileCompleted"}}]}}]}}]} as unknown as DocumentNode<CompleteProfileMutation, CompleteProfileMutationVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"createDate"}},{"kind":"Field","name":{"kind":"Name","value":"modifyDate"}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const GetUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"profileCompleted"}}]}}]}}]} as unknown as DocumentNode<GetUserProfileQuery, GetUserProfileQueryVariables>;
export const GetProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"profileCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createDate"}},{"kind":"Field","name":{"kind":"Name","value":"modifyDate"}}]}}]}}]}}]} as unknown as DocumentNode<GetProfileQuery, GetProfileQueryVariables>;
export const GetProfilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProfiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"profileCompleted"}}]}}]}}]} as unknown as DocumentNode<GetProfilesQuery, GetProfilesQueryVariables>;
export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createDate"}},{"kind":"Field","name":{"kind":"Name","value":"modifyDate"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;
export const GetFollowingPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFollowingPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followingPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createDate"}},{"kind":"Field","name":{"kind":"Name","value":"modifyDate"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]}}]} as unknown as DocumentNode<GetFollowingPostsQuery, GetFollowingPostsQueryVariables>;
export const GetIsFollowingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getIsFollowing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isFollowing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}},{"kind":"Argument","name":{"kind":"Name","value":"followerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followerId"}}}]}]}}]} as unknown as DocumentNode<GetIsFollowingQuery, GetIsFollowingQueryVariables>;