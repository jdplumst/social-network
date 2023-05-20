import { useQuery, useMutation } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { gql } from "@/client-gen";
import { Post, Profile } from "@/client-gen/graphql";

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
    }
  }
`);

const GET_POSTS = gql(`
  query Posts {
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

const CREATE_POST = gql(`
  mutation CreatePost($profileId: String!, $description: String!) {
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

  const [createPost, { data, loading: loadingPost, error: postError }] =
    useMutation(CREATE_POST);

  const { loading } = useQuery(GET_POSTS, {
    onCompleted(data) {
      setPosts(data.posts);
    }
  });

  const handlePostInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setDescription((e.target as HTMLTextAreaElement).value);
    setPostLength((e.target as HTMLTextAreaElement).value.length);
  };

  const handleCreatePost = () => {
    createPost({
      variables: { profileId: profile?.id!, description: description },
      onCompleted(data, clientOptions) {
        setPosts((prevPosts) => [
          { ...data.createPost, profile: profile },
          ...(prevPosts ?? [])
        ]);
      },
      onError(error, clientOptions) {
        console.log(error.message);
      }
    });
  };

  if (loading || load) return <p>Loading</p>;

  return (
    <>
      <Head>
        <title>Social Network</title>
        <meta name="description" content="Social Network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="color min-h-screen p-4">
        <div className="mx-auto mb-5 w-1/2 rounded-lg border-2 border-slate-300 p-2">
          <div className="flex justify-center">
            <textarea
              placeholder="Write a Post!"
              maxLength={255}
              onInput={(e) => handlePostInput(e)}
              className="mb-5 w-full border-2 border-black bg-inherit p-2 text-inherit"></textarea>
          </div>
          <div className="flex justify-between">
            <span className="text-[12px]">{postLength}/255</span>
            <button
              onClick={() => handleCreatePost()}
              className="ml-5 rounded-lg bg-purple-600 px-4 py-2 font-bold text-white hover:cursor-pointer hover:bg-purple-700">
              Add Post
            </button>
          </div>
          {postError && <div className="text-red-500">{postError.message}</div>}
        </div>
        <div className="flex justify-center">
          <div className="grid w-screen grid-cols-1 justify-center gap-5">
            {posts &&
              posts.map((p) => (
                <div
                  key={p.id}
                  className="border-color mx-auto w-1/3 overflow-auto border-2 p-4">
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
                    <div className="flex items-end gap-4">
                      <span className="text-3xl font-bold">
                        {p.profile!.firstName} {p.profile!.lastName}
                      </span>
                      <span>({p.createDate})</span>
                    </div>
                  </div>
                  <span className="text-xl">{p.description}</span>
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
