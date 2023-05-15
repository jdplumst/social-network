import { useQuery, gql } from "@apollo/client";
import Head from "next/head";
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

const GET_PROFILES = gql`
  query getProfiles {
    profiles {
      id
      firstName
      lastName
      location
      occupation
      gender
      birthday
    }
  }
`;

export default function Home() {
  const [load, setLoad] = useState(true);
  const { push } = useRouter();
  useQuery(GET_USER_PROFILE, {
    onCompleted(data) {
      if (!data.getUserProfile) {
        push("/onboarding/info");
      } else if (!data.getUserProfile.profileCompleted) {
        push("/onboarding/picture");
      } else if (data.getUserProfile.profileCompleted) {
        setLoad(false);
      }
    },
    onError() {
      push("/");
    }
  });

  const { loading, data } = useQuery(GET_PROFILES);

  if (loading || load) return <p>Loading</p>;

  return (
    <>
      <Head>
        <title>Social Network</title>
        <meta name="description" content="Social Network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="color min-h-screen">
        <div className="grid justify-center gap-5 p-4">
          {data.getProfiles.map((p: any) => (
            <div key={p.id} className="border-color border-2 p-4">
              {p.firstName} {p.lastName}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
