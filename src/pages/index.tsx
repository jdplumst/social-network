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
      <main className="color flex min-h-screen flex-col items-center justify-evenly">
        <h1 className="text-8xl">Social Network</h1>
        <div className="flex">
          <Link href="/login">
            <button className="mr-32 rounded-lg bg-purple-600 p-4 text-4xl font-bold text-white hover:cursor-pointer hover:bg-purple-700">
              Log In
            </button>
          </Link>
          <Link href="/signup">
            <button className="rounded-lg bg-green-600 p-4 text-4xl font-bold text-white hover:cursor-pointer hover:bg-green-700">
              Sign Up
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
