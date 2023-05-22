import { gql } from "@/client-gen";
import { Post } from "@/client-gen/graphql";
import LoadingPage from "@/components/LoadingPage";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const GET_POSTS = gql(`
  query Posts {
    posts {
      id
      profileId
      description
      createDate
      modifyDate
      profile {
        firstName
        lastName
        location
        occupation
        gender
        birthday
        profilePicture
      }
    }
  }
`);

export default function Profile() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const { loading } = useQuery(GET_POSTS, {
    onCompleted(data) {
      setPosts(data.posts!);
    }
  });

  if (loading) return <LoadingPage />;

  return (
    <>
      {posts?.map((p: Post) => (
        <div>{p.description}</div>
      ))}
    </>
  );
}
