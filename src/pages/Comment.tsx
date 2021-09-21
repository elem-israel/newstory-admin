import React, { useEffect, useState } from "react";
import CommentForm from "../components/CommentForm";
import comment from "../api/comment";
import { CircularProgress } from "@material-ui/core";

function Comment() {
  const [reportReasons, setReportReasons] = useState<DbString[] | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  useEffect(() => {
    !reportReasons &&
      comment
        .getStringFromCategory("reportReason")
        .then((res) => setReportReasons(res));
  });

  useEffect(() => {
    if (!posts) {
      comment.getRandomPosts(10).then((res) => setPosts(res));
    } else if (posts?.length < 5) {
      comment.getRandomPosts(5).then((res) => setPosts(posts.concat(res)));
    }
  });

  useEffect(() => {
    if (!currentPost && posts && posts.length > 0) {
      setCurrentPost(posts[0]);
      setPosts(posts.splice(0, 1));
    }
  });

  return reportReasons && currentPost ? (
    <CommentForm reportReasons={reportReasons} />
  ) : (
    <CircularProgress />
  );
}

export default Comment;
