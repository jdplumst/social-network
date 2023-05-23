import { gql } from "@/client-gen";
import { Profile } from "@/client-gen/graphql";
import LoadingPage from "@/components/LoadingPage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useQuery } from "@apollo/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

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
          <div className="flex flex-col items-center">
            <div className="flex justify-center">
              <img src={profile?.profilePicture!} className="h-64 w-64" />
            </div>
            <div className="flex justify-center pb-4 text-3xl font-bold">
              {profile?.firstName} {profile?.lastName}
            </div>
            <div className="border-color mx-auto mb-5 grid w-1/2 grid-cols-3 gap-x-10 gap-y-2 overflow-auto border-2 p-4">
              <p>
                <b>First Name:</b> {profile?.firstName}
              </p>
              <p>
                <b>Last Name:</b> {profile?.lastName}
              </p>
              <p>
                <b>Location:</b> {profile?.location}
              </p>
              <p>
                <b>Occupation:</b> {profile?.occupation}
              </p>
              <p>
                <b>Gender:</b> {profile?.gender}
              </p>
              <p>
                <b>Birthday:</b>{" "}
                {dayjs(profile?.birthday).format("MMMM DD, YYYY")}
              </p>
            </div>
            <div className="flex w-1/2 justify-center">
              <div className="grid grid-cols-1 justify-center gap-5">
                {profile?.posts?.map((p) => (
                  <div
                    key={p.id}
                    className="border-color mx-auto w-full overflow-auto border-2 p-4">
                    <div className="flex items-center gap-4 pb-2">
                      <img
                        src={profile!.profilePicture!}
                        alt={
                          profile!.firstName +
                          ` ` +
                          profile!.lastName +
                          `\'s profile picture`
                        }
                        className="inline h-14 w-14"
                      />{" "}
                      <div className="flex gap-2">
                        <Link href={`/profile/${p.profileId}`}>
                          <span className="text-2xl font-bold">
                            {profile!.firstName} {profile!.lastName}
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
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
