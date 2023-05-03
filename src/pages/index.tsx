import Head from "next/head";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
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

export default function Home() {
  const { push } = useRouter();
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    onCompleted(data) {
      if (!data.getUserProfile) {
        push("/onboarding/info");
      } else if (data.getUserProfile.profileCompleted) {
        push("/home");
      }
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
      <main className="flex flex-col justify-evenly items-center min-h-screen bg-slate-300">
        <h1 className="text-8xl text-black">Social Network</h1>
        <div className="flex">
          <Link href="/login">
            <button className="text-4xl mr-32 bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold">
              Log In
            </button>
          </Link>
          <Link href="/signup">
            <button className="text-4xl bg-green-500 hover:bg-green-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold">
              Sign Up
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
