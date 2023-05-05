import Head from "next/head";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";

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

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    # This part can be named anything
    login(email: $email, password: $password) {
      # This is name of actual mutation
      id
      email
    }
  }
`;

export default function Login() {
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

  const [login, { data, error }] = useMutation(LOGIN);

  if (loading) return <p>Loading</p>;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      variables: { email: email, password: password },
      // onCompleted(data, clientOptions) {
      //   setMsg(data.login.email);
      // },
      onError(error, clientOptions) {
        setErrorMsg(error.message);
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
      <main>
        <div className="bg-slate-300 min-h-screen flex justify-center items-center pt-10 text-black">
          <form
            onSubmit={handleLogin}
            className="flex flex-col p-10 bg-white w-1/2 h-1/3">
            <h3 className="text-3xl text-center pb-5 font-bold">Login</h3>
            <label className="font-bold">Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="p-2 mb-5 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
            />
            <label className="font-bold">Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="p-2 mb-5 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
            />
            <button
              disabled={loading}
              className="text-xl bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold mx-auto">
              Login
            </button>
            {errorMsg && (
              <div className="bg-pink-200 border-solid border-4 border-pink-300 mt-5 p-2 flex justify-center font-bold mx-auto">
                {errorMsg}
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
