import Head from "next/head";
import { gql, useMutation, useQuery } from "@apollo/client";
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
      <main>
        <div className="color min-h-screen flex justify-center items-center pt-10">
          <form
            onSubmit={handleSignup}
            className="flex flex-col p-10 w-1/2 h-1/3 border-2 border-color">
            <h3 className="text-3xl text-center pb-5 font-bold">Sign Up</h3>
            <label className="font-bold text-xl">Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="p-2 mb-5 border-solid border-2 bg-inherit border-color focus:border-slate-500 focus:outline-none rounded-lg block w-full"
            />
            <label className="font-bold text-xl">Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="p-2 mb-5 border-solid border-2 bg-inherit border-color focus:border-slate-500 focus:outline-none rounded-lg block w-full"
            />
            <button className="text-xl bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold w-1/4 mx-auto">
              Sign Up
            </button>
            {errorMsg && (
              <div className="bg-pink-500 border-solid border-2 border-pink-700 mx-auto mt-5 p-2 w-3/5 text-center">
                {errorMsg}
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
