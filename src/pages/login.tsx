import Head from "next/head";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { gql } from "@/client-gen";
import LoadingSpinner from "@/components/LoadingSpinner";

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

export default function Login() {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);

  const [login, { loading: loginLoad }] = useMutation(LOGIN);

  if (loading) return <p>Loading</p>;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    login({
      variables: { email: email, password: password },
      onCompleted(data, clientOptions) {
        push("/home");
      },
      onError(error, clientOptions) {
        setErrorMsg(error.message);
        setDisabled(false);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Social Network - Login</title>
        <meta name="description" content="Social Network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="color flex min-h-screen items-center justify-center pt-10">
        <form
          onSubmit={handleLogin}
          className="border-color flex h-1/3 w-1/2 flex-col border-2 p-10">
          <h3 className="pb-5 text-center text-3xl font-bold">Login</h3>
          <label className="font-bold">Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border-color mb-5 block w-full rounded-lg border-2 border-solid bg-inherit p-2 focus:border-slate-500 focus:outline-none"
          />
          <label className="font-bold">Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border-color mb-5 block w-full rounded-lg border-2 border-solid bg-inherit p-2 focus:border-slate-500 focus:outline-none"
          />
          <button
            disabled={disabled}
            className="mx-auto rounded-lg bg-purple-600 p-4 text-xl font-bold text-white hover:cursor-pointer hover:bg-purple-700">
            {loginLoad ? <LoadingSpinner /> : "Login"}
          </button>
          {errorMsg && (
            <div className="mx-auto mt-5 flex justify-center border-2 border-solid border-pink-700 bg-pink-500 p-2 font-bold">
              {errorMsg}
            </div>
          )}
        </form>
      </main>
    </>
  );
}
