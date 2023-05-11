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

const LOGOUT = gql`
  mutation logout {
    logout {
      email
      id
    }
  }
`;

const COMPLETE_PROFILE = gql`
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
`;

export default function OnboardingPicture() {
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  useQuery(GET_USER_PROFILE, {
    onCompleted(data) {
      if (!data.getUserProfile) {
        push("/onboarding/info");
      } else if (!data.getUserProfile.profileCompleted) {
        setLoading(false);
      } else if (data.getUserProfile.profileCompleted) {
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
    <div className="bg-slate-300 min-h-screen flex justify-center items-center pt-10">
      <button
        onClick={() => handleLogout()}
        className="absolute top-10 left-10 bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold">
        Logout
      </button>
      <div className="flex flex-col p-10 bg-white w-3/4 h-1/3">
        <h3 className="text-2xl text-center pb-5 font-bold">
          Select a Profile Picture
        </h3>
        <div className="grid grid-cols-3 gap-10 justify-items-center ">
          <div
            className={`${
              profilePicture ===
              "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                ? "border-red-500 border-solid border-8"
                : "border-white border-solid border-8"
            } w-56 h-56`}>
            <img
              className="w-52 h-52"
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
                ? "border-red-500 border-solid border-8"
                : "border-white border-solid border-8"
            } w-56 h-56`}>
            <img
              className="w-52 h-52"
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
                ? "border-red-500 border-solid border-8"
                : "border-white border-solid border-8"
            } w-56 h-56`}>
            <img
              className="w-52 h-52"
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
                ? "border-red-500 border-solid border-8"
                : "border-white border-solid border-8"
            } w-56 h-56`}>
            <img
              className="w-52 h-52"
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
                ? "border-red-500 border-solid border-8"
                : "border-white border-solid border-8"
            } w-56 h-56`}>
            <img
              className="w-52 h-52"
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
                ? "border-red-500 border-solid border-8"
                : "border-white border-solid border-8"
            } w-56 h-56`}>
            <img
              className="w-52 h-52"
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
          className="bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold w-1/4 mx-auto mt-10">
          Finish Signup
        </button>
        {error && (
          <div className="bg-pink-200 border-solid border-4 border-pink-300 mx-auto mt-5 p-2 w-3/5 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
