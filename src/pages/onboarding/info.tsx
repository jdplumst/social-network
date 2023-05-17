import { useMutation, useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { gql } from "@/__generated__";

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

const CREATE_PROFILE = gql(`
  mutation CreateProfile(
    $firstName: String
    $lastName: String
    $location: String
    $occupation: String
    $gender: String
    $birthday: Date
  ) {
    createProfile(
      firstName: $firstName
      lastName: $lastName
      location: $location
      occupation: $occupation
      gender: $gender
      birthday: $birthday
    ) {
      firstName
      lastName
      location
      occupation
      gender
      birthday
    }
  }
`);

export default function OnboardingInfo() {
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  useQuery(GET_USER_PROFILE, {
    onCompleted(data) {
      if (!data.userProfile) {
        setLoading(false);
      } else if (!data.userProfile.profileCompleted) {
        push("/onboarding/picture");
      } else if (data.userProfile.profileCompleted) {
        push("/home");
      }
    },
    onError() {
      push("/");
    }
  });

  const [logout] = useMutation(LOGOUT);
  const [createProfile] = useMutation(CREATE_PROFILE);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState<string | null>(null);

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

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    createProfile({
      variables: {
        firstName: firstName,
        lastName: lastName,
        location: location,
        occupation: occupation,
        gender: gender,
        birthday: new Date(birthday)
      },
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
        <title>Social Network - Onboarding Info</title>
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
        <form
          onSubmit={handleCreateProfile}
          className="border-color flex h-1/3 w-1/2 flex-col border-2 p-10">
          <h3 className="pb-5 text-center text-3xl font-bold">
            Profile Information
          </h3>
          <div className="grid grid-cols-2 gap-10">
            <div>
              <label className="text-xl font-bold">First Name:</label>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="border-color block w-full rounded-lg border-2 border-solid bg-inherit p-2 focus:border-slate-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xl font-bold">Last Name:</label>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="border-color block w-full rounded-lg border-2 border-solid bg-inherit p-2 focus:border-slate-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xl font-bold">Location:</label>
              <input
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className="border-color block w-full rounded-lg border-2 border-solid bg-inherit p-2 focus:border-slate-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xl font-bold">Occupation:</label>
              <input
                type="text"
                onChange={(e) => setOccupation(e.target.value)}
                value={occupation}
                className="border-color block w-full rounded-lg border-2 border-solid bg-inherit p-2 focus:border-slate-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xl font-bold">Gender:</label>
              <input
                type="text"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                className="border-color block w-full rounded-lg border-2 border-solid bg-inherit p-2 focus:border-slate-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xl font-bold">Birthday:</label>
              <input
                type="date"
                onChange={(e) => setBirthday(e.target.value)}
                value={birthday}
                className="border-color block w-full rounded-lg border-2 border-solid bg-inherit p-2 focus:border-slate-500 focus:outline-none"
              />
            </div>
          </div>
          <button className="mx-auto mt-10 w-1/4 rounded-lg bg-purple-600 p-4 text-xl font-bold text-white hover:cursor-pointer hover:bg-purple-700">
            Next
          </button>
          {error && (
            <div className="mx-auto mt-5 w-3/5 border-2 border-solid border-pink-700 bg-pink-500 p-2 text-center">
              {error}
            </div>
          )}
        </form>
      </main>
    </>
  );
}
