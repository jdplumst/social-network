import { gql } from "@/client-gen";
import { Post, Profile } from "@/client-gen/graphql";
import LoadingPage from "@/components/LoadingPage";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

// const GET_PROFILE = gql(`
//   query GetProfile($profileId: String!) {
//     getProfile(profileId: $profileId) {
//       id
//       firstName
//       lastName
//       location
//       occupation
//       gender
//       birthday
//       profilePicture
//     }
//   }
// `);

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
  console.log(typeof GET_USER_PROFILE);
  // console.log(typeof GET_PROFILE);
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

  // useQuery(GET_PROFILE, {
  //   onCompleted(data) {
  //     console.log(data);
  //   },
  //   onError(error) {
  //     console.log(error.message);
  //   }
  // });

  return (
    <>
      <div>hi!</div>
    </>
  );
}
