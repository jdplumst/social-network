import { useMutation, useQuery } from "@apollo/client";
import Head from "next/head";
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

const LOGOUT = gql(`
  mutation logout {
    logout {
      email
      id
    }
  }
`);

const COMPLETE_PROFILE = gql(`
  mutation CompleteProfile($profilePicture: String) {
    completeProfile(profilePicture: $profilePicture) {
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

export default function OnboardingPicture() {
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  useQuery(GET_USER_PROFILE, {
    onCompleted(data) {
      if (!data.userProfile) {
        push("/onboarding/info");
      } else if (!data.userProfile.profileCompleted) {
        setLoading(false);
      } else if (data.userProfile.profileCompleted) {
        push("/home");
      }
    },
    onError() {
      push("/");
    }
  });

  const [logout] = useMutation(LOGOUT);
  const [completeProfile] = useMutation(COMPLETE_PROFILE);

  const [profilePicture, setProfilePicture] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);

  const handleLogout = () => {
    setLoading(true);
    logout({
      onCompleted(data, clientOptions) {
        window.location.replace(
          process.env.NODE_ENV === "development"
            ? (process.env.NEXT_PUBLIC_DEV_URL as string)
            : (process.env.NEXT_PUBLIC_PROD_URL as string)
        );
      },
      onError(error, clientOptions) {
        setLoading(false);
      }
    });
  };

  const finishOnboarding = () => {
    completeProfile({
      variables: { profilePicture: profilePicture },
      onCompleted(data, clientOptions) {
        window.location.replace(
          process.env.NODE_ENV === "development"
            ? (process.env.NEXT_PUBLIC_DEV_URL as string)
            : (process.env.NEXT_PUBLIC_PROD_URL as string)
        );
      },
      onError(error, clientOptions) {
        setError(error.message);
      }
    });
  };

  if (loading) return <p>Loading</p>;

  return (
    <>
      <Head>
        <title>Social Network - Onboarding Picture</title>
        <meta name="description" content="Social Network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="color flex min-h-screen items-center justify-center pt-10">
        <button
          onClick={() => handleLogout()}
          className="absolute left-10 top-10 rounded-lg bg-red-500 p-4 font-bold text-white hover:cursor-pointer hover:bg-red-700">
          Logout
        </button>
        <div className="border-color flex h-1/3 w-3/4 flex-col border-2 p-10">
          <h3 className="pb-5 text-center text-2xl font-bold">
            Select a Profile Picture
          </h3>
          <div className="grid grid-cols-3 justify-items-center gap-10 ">
            <div
              className={`${
                profilePicture ===
                "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  ? "border-color border-8 border-solid"
                  : "border-8 border-solid border-[#28284e]"
              } h-56 w-56`}>
              <img
                className="h-52 w-52"
                onClick={() => {
                  setProfilePicture(
                    "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  );
                }}
                src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                alt="earth"
              />
            </div>
            <div
              className={`${
                profilePicture ===
                "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  ? "border-color border-8 border-solid"
                  : "border-8 border-solid border-[#28284e]"
              } h-56 w-56`}>
              <img
                className="h-52 w-52"
                onClick={() => {
                  setProfilePicture(
                    "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  );
                }}
                src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="tree"
              />
            </div>
            <div
              className={`${
                profilePicture ===
                "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                  ? "border-color border-8 border-solid"
                  : "border-8 border-solid border-[#28284e]"
              } h-56 w-56`}>
              <img
                className="h-52 w-52"
                onClick={() => {
                  setProfilePicture(
                    "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                  );
                }}
                src="https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                alt="mario"
              />
            </div>
            <div
              className={`${
                profilePicture ===
                "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  ? "border-color border-8 border-solid"
                  : "border-8 border-solid border-[#28284e]"
              } h-56 w-56`}>
              <img
                className="h-52 w-52"
                onClick={() => {
                  setProfilePicture(
                    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  );
                }}
                src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="dog"
              />
            </div>
            <div
              className={`${
                profilePicture ===
                "https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80"
                  ? "border-color border-8 border-solid"
                  : "border-8 border-solid border-[#28284e]"
              } h-56 w-56`}>
              <img
                className="h-52 w-52"
                onClick={() => {
                  setProfilePicture(
                    "https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80"
                  );
                }}
                src="https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80"
                alt="ball"
              />
            </div>
            <div
              className={`${
                profilePicture ===
                "https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  ? "border-color border-8 border-solid"
                  : "border-8 border-solid border-[#28284e]"
              } h-56 w-56`}>
              <img
                className="h-52 w-52"
                onClick={() => {
                  setProfilePicture(
                    "https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  );
                }}
                src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="car"
              />
            </div>
          </div>
          <button
            onClick={() => finishOnboarding()}
            className="mx-auto mt-10 w-1/4 rounded-lg bg-purple-600 p-4 font-bold text-white hover:cursor-pointer hover:bg-purple-700">
            Finish Signup
          </button>
          {error && (
            <div className="mx-auto mt-5 w-3/5 border-2 border-solid border-pink-700 bg-pink-500 p-2 text-center">
              {error}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
