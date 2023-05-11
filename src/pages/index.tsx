import Head from "next/head";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const GET_USER_PROFILE = gql`
  query getUserProfile {
    getUserProfile {
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

export default function Intro() {
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  useQuery(GET_USER_PROFILE, {
    onCompleted(data) {
      if (!data.getUserProfile) {
        push("/onboarding/info");
      } else if (!data.getUserProfile.profileCompleted) {
        push("/onboarding/picture");
      } else if (data.getUserProfile.profileCompleted) {
        push("/home");
      }
    },
    onError() {
      setLoading(false);
    }
  });
  if (loading) return <p>Loading</p>;

  return (
    <>
      <Head>
        <title>Social Network</title>
        <meta name="description" content="Social Network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-evenly items-center min-h-screen color">
        <h1 className="text-8xl">Social Network</h1>
        <div className="flex">
          <Link href="/login">
            <button className="text-4xl mr-32 bg-purple-600 hover:bg-purple-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold">
              Log In
            </button>
          </Link>
          <Link href="/signup">
            <button className="text-4xl bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold">
              Sign Up
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
