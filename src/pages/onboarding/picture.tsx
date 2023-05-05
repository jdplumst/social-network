import { gql, useQuery } from "@apollo/client";
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
  if (loading) return <p>Loading</p>;

  return <div>hi</div>;
}
