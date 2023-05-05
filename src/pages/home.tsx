import { useQuery, gql } from "@apollo/client";
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

const GET_PROFILES = gql`
  query getProfiles {
    getProfiles {
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

  return data.getProfiles.map((p: any) => (
    <div key={p.id}>
      {p.firstName} {p.lastName}
    </div>
  ));
}
