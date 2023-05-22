import {
  useQuery,
  useMutation,
  useLazyQuery,
  NetworkStatus
} from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { gql } from "@/client-gen";
import { Post, Profile } from "@/client-gen/graphql";
import LoadingSpinner from "@/components/LoadingSpinner";
import LoadingPage from "@/components/LoadingPage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

const GET_USER_PROFILE = gql(`
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
`);

const GET_PROFILES = gql(`
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
`);

const GET_POSTS = gql(`
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
`);

const GET_FOLLOWING_POSTS = gql(`
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
`);

const CREATE_POST = gql(`
  mutation createPost($profileId: String!, $description: String!) {
    createPost(profileId: $profileId, description: $description) {
      id
      description
      profileId
      createDate
      modifyDate
    }
  }
`);

export default function Home() {
  const [load, setLoad] = useState(true);
  const { push } = useRouter();

  const [profile, setProfile] = useState<Profile>();
  useQuery(GET_USER_PROFILE, {
    onCompleted(data) {
      if (!data.userProfile) {
        push("/onboarding/info");
      } else if (!data.userProfile.profileCompleted) {
        push("/onboarding/picture");
      } else if (data.userProfile.profileCompleted) {
        setProfile(data.userProfile);
        setLoad(false);
      }
    },
    onError() {
      push("/");
    }
  });

  const [posts, setPosts] = useState<Post[] | null>();
  const [postLength, setPostLength] = useState(0);
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [createPost, { loading: loadingPost, error: postError }] =
    useMutation(CREATE_POST);

  const {
    loading: loadingPosts,
    refetch: refetchPosts,
    networkStatus: networkPosts
  } = useQuery(GET_POSTS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    onCompleted(data) {
      setPosts(data.posts);
    }
  });

  const [
    getFollowingPosts,
    {
      loading: loadingFollowingPosts,
      refetch: refetchFollowingPosts,
      networkStatus: networkFollowingPosts
    }
  ] = useLazyQuery(GET_FOLLOWING_POSTS, {
    variables: {
      profileId: profile?.id!
    },
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      setPosts(data.followingPosts);
    }
  });

  const handlePostInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setDescription((e.target as HTMLTextAreaElement).value);
    setPostLength((e.target as HTMLTextAreaElement).value.length);
  };

  const handleCreatePost = () => {
    setDisabled(true);
    createPost({
      variables: { profileId: profile?.id!, description: description },
      onCompleted(data, clientOptions) {
        setPosts((prevPosts) => [
          { ...data.createPost, profile: profile },
          ...(prevPosts ?? [])
        ]);
        setDescription("");
        setPostLength(0);
        setDisabled(false);
      },
      onError(error, clientOptions) {
        setDisabled(false);
      }
    });
  };

  if (load) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Social Network</title>
        <meta name="description" content="Social Network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="color flex min-h-screen justify-center p-4">
        <div className="w-1/2">
          <div className="border-color mx-auto mb-5 w-full rounded-lg border-2 p-2">
            <div className="flex justify-center">
              <textarea
                placeholder="Write a Post!"
                maxLength={255}
                onInput={(e) => handlePostInput(e)}
                value={description}
                className="mb-5 w-full border-2 border-black bg-inherit p-2 text-inherit"></textarea>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px]">{postLength}/255</span>
              <button
                onClick={() => handleCreatePost()}
                disabled={disabled}
                className="ml-5 rounded-lg bg-purple-600 px-4 py-2 font-bold text-white hover:cursor-pointer hover:bg-purple-700">
                {loadingPost ? <LoadingSpinner /> : "Add Post"}
              </button>
            </div>
            {postError && (
              <div className="text-red-500">{postError.message}</div>
            )}
          </div>
          <div className="flex justify-center gap-5 pb-4">
            <button
              onClick={() => refetchPosts()}
              className="rounded-lg bg-purple-600 p-4 text-white hover:cursor-pointer hover:bg-purple-700">
              All Posts
            </button>
            <button
              onClick={() => refetchFollowingPosts()}
              className="rounded-lg bg-purple-600 p-4 text-white hover:cursor-pointer hover:bg-purple-700">
              Posts of those you follow
            </button>
          </div>
          <div className="flex justify-center">
            <div className="grid w-screen grid-cols-1 justify-center gap-5">
              {loadingPosts ||
              loadingFollowingPosts ||
              networkPosts === NetworkStatus.refetch ||
              networkFollowingPosts === NetworkStatus.refetch ? (
                <LoadingSpinner />
              ) : (
                posts!.map((p) => (
                  <div
                    key={p.id}
                    className="border-color mx-auto w-full overflow-auto border-2 p-4">
                    <div className="flex items-center gap-4 pb-2">
                      <img
                        src={p.profile!.profilePicture!}
                        alt={
                          p.profile!.firstName +
                          ` ` +
                          p.profile!.lastName +
                          `\'s profile picture`
                        }
                        className="inline h-14 w-14"
                      />{" "}
                      <div className="flex gap-2">
                        <Link href={`/profile/${p.profileId}`}>
                          <span className="text-2xl font-bold">
                            {p.profile!.firstName} {p.profile!.lastName}
                          </span>
                        </Link>
                        <span className="text-2xl">·</span>
                        <span className="text-2xl">
                          {dayjs(p.createDate).fromNow()}
                        </span>
                      </div>
                    </div>
                    <span className="text-xl">{p.description}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
