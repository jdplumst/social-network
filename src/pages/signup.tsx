import Head from "next/head";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const GET_USER_PROFILE = gql`
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

const SIGNUP = gql`
  mutation signup($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      id
      email
    }
  }
`;

export default function Signup() {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<any>(null);

  const [signup] = useMutation(SIGNUP);

  if (loading) return <p>Loading</p>;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signup({
      variables: { email: email, password: password },
      onCompleted(data, clientOptions) {
        push("/onboarding/info");
      },
      onError(error, clientOptions) {
        setErrorMsg(error.message);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Social Network - Signup</title>
        <meta name="description" content="Social Network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="color flex min-h-screen items-center justify-center pt-10">
        <form
          onSubmit={handleSignup}
          className="border-color flex h-1/3 w-1/2 flex-col border-2 p-10">
          <h3 className="pb-5 text-center text-3xl font-bold">Sign Up</h3>
          <label className="text-xl font-bold">Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border-color mb-5 block w-full rounded-lg border-2 border-solid bg-inherit p-2 focus:border-slate-500 focus:outline-none"
          />
          <label className="text-xl font-bold">Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border-color mb-5 block w-full rounded-lg border-2 border-solid bg-inherit p-2 focus:border-slate-500 focus:outline-none"
          />
          <button className="mx-auto w-1/4 rounded-lg bg-green-600 p-4 text-xl font-bold text-white hover:cursor-pointer hover:bg-green-700">
            Sign Up
          </button>
          {errorMsg && (
            <div className="mx-auto mt-5 w-3/5 border-2 border-solid border-pink-700 bg-pink-500 p-2 text-center">
              {errorMsg}
            </div>
          )}
        </form>
      </main>
    </>
  );
}
