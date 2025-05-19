import PostAction from "./PostActions";
import PostBody from "./PostBody";
import PostComment from "./PostComment";
import PostHeader from "./PostHeader";

export default function PostCard({ post }) {
  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader post={post}></PostHeader>
      <PostBody poster={post?.image} content={post?.content}></PostBody>
      <PostAction
        postId={post?.id}
        commentCount={post?.comments?.length}
      ></PostAction>
      <PostComment post={post}></PostComment>
    </article>
  );
}
