import Head from "next/head";
import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { gql } from "@/client-gen";

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

const LOGIN = gql(`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`);

export default function Intro() {
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  useQuery(GET_USER_PROFILE, {
    onCompleted(data) {
      if (!data.userProfile) {
        push("/onboarding/info");
      } else if (!data.userProfile.profileCompleted) {
        push("/onboarding/picture");
      } else if (data.userProfile.profileCompleted) {
        push("/home");
      }
    },
    onError() {
      setLoading(false);
    }
  });

  const [login] = useMutation(LOGIN);

  const handleGuestLogin = () => {
    login({
      variables: {
        email: "guest@gmail.com",
        password: process.env.NEXT_PUBLIC_GUEST_PWD!
      },
      onCompleted(data, clientOptions) {
        push("/home");
      }
    });
  };

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
            <button className="mr-32 rounded-lg bg-green-600 p-4 text-4xl font-bold text-white hover:cursor-pointer hover:bg-green-700">
              Sign Up
            </button>
          </Link>
          <button
            onClick={() => handleGuestLogin()}
            className="rounded-lg bg-slate-600 p-4 text-4xl font-bold text-white hover:cursor-pointer hover:bg-slate-700">
            Guest Login
          </button>
        </div>
      </main>
    </>
  );
}
