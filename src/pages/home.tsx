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

const GET_POSTS = gql`
  query Posts {
    posts {
      id
      profileId
      description
      createDate
      modifyDate
    }
  }
`;

export default function Home() {
  const [load, setLoad] = useState(true);
  const { push } = useRouter();
  useQuery(GET_USER_PROFILE, {
    onCompleted(data) {
      if (!data.userProfile) {
        push("/onboarding/info");
      } else if (!data.userProfile.profileCompleted) {
        push("/onboarding/picture");
      } else if (data.userProfile.profileCompleted) {
        setLoad(false);
      }
    },
    onError() {
      push("/");
    }
  });

  // const { loading, data } = useQuery(GET_PROFILES);

  const [posts, setPosts] = useState([]);

  const { loading } = useQuery(GET_POSTS, {
    onCompleted(data) {
      setPosts(data.posts);
    }
  });

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
          {posts.map((p: any) => (
            <div key={p.id} className="border-color border-2 p-4">
              {p.description} {p.createDate}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
