import { gql } from "@/client-gen";
import { Profile } from "@/client-gen/graphql";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const GET_PROFILE = gql(`
  query getProfile($profileId: String!) {
    profile(profileId: $profileId) {
      id
      firstName
      lastName
      location
      occupation
      gender
      birthday
      posts {
        id
        profileId
        description
        createDate
        modifyDate
      }
    }
  }
`);

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

export default function Profile() {
  const [load, setLoad] = useState(true);
  const { push } = useRouter();

  const [profile, setProfile] = useState<Profile>();
  useQuery(GET_USER_PROFILE, {
    onCompleted(data) {
      if (!data.userProfile) {
        push("/onboarding/info");
      } else if (!data.userProfile.profileCompleted) {
        push("/onboarding/picture");
      } else if (data.userProfile.profileCompleted) {
        setProfile(data.userProfile);
        setLoad(false);
      }
    },
    onError() {
      push("/");
    }
  });

  return (
    <>
      <div>hi!</div>
    </>
  );
}
