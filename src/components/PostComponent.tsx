import { Post, Profile } from "@/client-gen/graphql";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

interface PostComponentProps {
  post: Post;
  profile: Profile;
}

export default function PostComponent({ post, profile }: PostComponentProps) {
  return (
    <div className="border-color mx-auto w-full overflow-auto border-2 p-4">
      <div className="flex items-center gap-4 pb-2">
        <img
          src={profile!.profilePicture!}
          alt={
            profile!.firstName + ` ` + profile!.lastName + `\'s profile picture`
          }
          className="inline h-14 w-14"
        />{" "}
        <div className="flex gap-2">
          <Link href={`/profile/${post.profileId}`}>
            <span className="text-2xl font-bold">
              {profile!.firstName} {profile!.lastName}
            </span>
          </Link>
          <span className="text-2xl">·</span>
          <span className="text-2xl">{dayjs(post.createDate).fromNow()}</span>
        </div>
      </div>
      <span className="text-xl">{post.description}</span>
    </div>
  );
}
