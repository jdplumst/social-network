import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
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

export default function OnboardingInfo() {
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  useQuery(GET_USER_PROFILE, {
    onCompleted(data) {
      if (!data.getUserProfile) {
        setLoading(false);
      } else if (!data.getUserProfile.profileCompleted) {
        push("/onboarding/picture");
      } else if (data.getUserProfile.profileCompleted) {
        push("/home");
      }
    },
    onError() {
      push("/");
    }
  });
  if (loading) return <p>Loading</p>;

  return (
    <>
      <Head>
        <title>Social Network - Onboarding Info</title>
        <meta name="description" content="Social Network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-slate-300 min-h-screen flex justify-center items-center pt-10">
          <button
            // onClick={logout}
            className="absolute top-10 left-10 bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold">
            Logout
          </button>
          <form
            // onSubmit={createProfile}
            className="flex flex-col p-10 bg-white w-1/2 h-1/3">
            <h3 className="text-3xl text-center pb-5 font-bold">
              Profile Information
            </h3>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <label className="font-bold text-xl">First Name:</label>
                <input
                  type="text"
                  // onChange={(e) => setFirstName(e.target.value)}
                  // value={firstName}
                  className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
                />
              </div>
              <div>
                <label className="font-bold text-xl">Last Name:</label>
                <input
                  type="text"
                  // onChange={(e) => setLastName(e.target.value)}
                  // value={lastName}
                  className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
                />
              </div>
              <div>
                <label className="font-bold text-xl">Location:</label>
                <input
                  type="text"
                  // onChange={(e) => setLocation(e.target.value)}
                  // value={location}
                  className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
                />
              </div>
              <div>
                <label className="font-bold text-xl">Occupation:</label>
                <input
                  type="text"
                  // onChange={(e) => setOccupation(e.target.value)}
                  // value={occupation}
                  className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
                />
              </div>
              <div>
                <label className="font-bold text-xl">Gender:</label>
                <input
                  type="text"
                  // onChange={(e) => setGender(e.target.value)}
                  // value={gender}
                  className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
                />
              </div>
              <div>
                <label className="font-bold text-xl">Birthday:</label>
                <input
                  type="date"
                  // onChange={(e) => setBirthday(e.target.value)}
                  // value={birthday}
                  className="p-2 border-solid border-2 border-slate-200 focus:border-slate-500 focus:outline-none rounded-lg block w-full"
                />
              </div>
            </div>
            <button className="text-xl bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-white p-4 rounded-lg font-bold w-1/4 mx-auto mt-10">
              Next
            </button>
            {/* {error && (
              <div className="bg-pink-200 border-solid border-4 border-pink-300 mx-auto mt-5 p-2 w-3/5 text-center">
                {error}
              </div>
            )} */}
          </form>
        </div>
      </main>
    </>
  );
}
