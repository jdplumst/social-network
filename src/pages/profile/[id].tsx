import { gql } from "@/client-gen";
import { Profile } from "@/client-gen/graphql";
import LoadingPage from "@/components/LoadingPage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useMutation, useQuery } from "@apollo/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostComponent from "@/components/PostComponent";

dayjs.extend(relativeTime);

const GET_PROFILE = gql(`
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
`);

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

const GET_IS_FOLLOWING = gql(`
  query getIsFollowing($profileId: String!, $followerId: String!) {
    isFollowing(profileId: $profileId, followerId: $followerId)
  }
`);

const CREATE_FOLLOW = gql(`
  mutation createFollow($profileId: String!) {
    createFollow(profileId: $profileId) {
      profileId
      followerId
    }
  }
`);

const DELETE_FOLLOW = gql(`
  mutation deleteFollow($profileId: String!) {
    deleteFollow(profileId: $profileId) {
      profileId
      followerId
    }
  }
`);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params!.id;
  return { props: { id: id } };
}

export default function ProfilePage({
  id
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [load, setLoad] = useState(true);
  const { push } = useRouter();

  const [userProfile, setUserProfile] = useState<Profile>();
  useQuery(GET_USER_PROFILE, {
    onCompleted(data) {
      if (!data.userProfile) {
        push("/onboarding/info");
      } else if (!data.userProfile.profileCompleted) {
        push("/onboarding/picture");
      } else if (data.userProfile.profileCompleted) {
        console.log(data);
        setUserProfile(data.userProfile);
        setLoad(false);
      }
    },
    onError() {
      push("/");
    }
  });

  const [profile, setProfile] = useState<Profile>();
  const { loading: loadingProfile } = useQuery(GET_PROFILE, {
    variables: { profileId: id! as string },
    onCompleted(data) {
      if (!data.profile || !data.profile.profileCompleted) {
        push("/404");
      }
      setProfile(data.profile!);
    },
    onError(error) {
      console.log(error.message);
    }
  });

  const [following, setFollowing] = useState(false);
  const { loading: loadingFollowing } = useQuery(GET_IS_FOLLOWING, {
    variables: { profileId: profile?.id!, followerId: userProfile?.id! },
    onCompleted(data) {
      setFollowing(data.isFollowing!);
    }
  });

  const [createFollow] = useMutation(CREATE_FOLLOW);
  const [deleteFollow] = useMutation(DELETE_FOLLOW);

  const handleCreateFollow = () => {
    createFollow({ variables: { profileId: profile?.id! } });
    setFollowing(true);
  };

  const handleDeleteFollow = () => {
    deleteFollow({ variables: { profileId: profile?.id! } });
    setFollowing(false);
  };

  if (load) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>
          Social Network - {profile?.firstName} {profile?.lastName}{" "}
        </title>
        <meta name="description" content="Social Network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="color flex min-h-screen justify-center p-4">
        {loadingProfile ? (
          <LoadingSpinner />
        ) : (
          <div className="flex w-full flex-col items-center">
            <div className="flex justify-center">
              <img src={profile!.profilePicture!} className="h-64 w-64" />
            </div>
            <div className="flex items-center justify-center gap-5 py-4 text-3xl font-bold">
              {profile!.firstName} {profile!.lastName}{" "}
              {following && userProfile?.id !== profile?.id ? (
                <button
                  onClick={() => handleDeleteFollow()}
                  className="border-color rounded-lg border-2 bg-slate-500 p-4 text-xl font-bold text-white hover:cursor-pointer hover:bg-slate-600">
                  {loadingFollowing ? <LoadingSpinner /> : `Unfollow`}
                </button>
              ) : !following && userProfile?.id !== profile?.id ? (
                <button
                  onClick={() => handleCreateFollow()}
                  className="rounded-lg bg-purple-600 p-4 text-xl font-bold text-white hover:cursor-pointer hover:bg-purple-700">
                  {loadingFollowing ? <LoadingSpinner /> : `Follow`}
                </button>
              ) : (
                <></>
              )}
            </div>
            <div className="border-color mx-auto mb-5 grid w-3/4 grid-cols-3 gap-x-10 gap-y-2 overflow-auto border-2 p-4">
              <p className="text-xl">
                <b>First Name:</b> {profile!.firstName}
              </p>
              <p className="text-xl">
                <b>Last Name:</b> {profile!.lastName}
              </p>
              <p className="text-xl">
                <b>Location:</b> {profile!.location}
              </p>
              <p className="text-xl">
                <b>Occupation:</b> {profile!.occupation}
              </p>
              <p className="text-xl">
                <b>Gender:</b> {profile!.gender}
              </p>
              <p className="text-xl">
                <b>Birthday:</b>{" "}
                {dayjs(profile!.birthday).format("MMMM DD, YYYY")}
              </p>
            </div>
            <div className="flex w-1/2 justify-center">
              <div className="grid w-screen grid-cols-1 justify-center gap-5">
                {profile?.posts?.map((p) => (
                  <PostComponent key={p!.id} post={p!} profile={profile} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
