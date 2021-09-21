import React, { useEffect, useState } from "react";
import CommentForm, { FormValues } from "../components/CommentForm";
import comment from "../api/comment";
import { CircularProgress } from "@material-ui/core";

function Comment() {
  const [reportReasons, setReportReasons] = useState<DbString[] | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

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
      setPosts(posts.splice(1));
    }
  });

  return reportReasons && currentPost && !loading ? (
    <CommentForm
      reportReasons={reportReasons}
      post={currentPost}
      onSkip={() => setCurrentPost(null)}
      onSubmit={async (values: FormValues) => {
        setLoading(true);
        await comment.submitReport(currentPost, values.sexualHarm, {
          otherComments: values.otherComments,
          quotesAndWords: values.quotesAndWords,
          generalHarm: values.generalHarm,
          reportReasons: values.reportReasons,
        });
        setCurrentPost(null);
        setLoading(false);
      }}
    />
  ) : (
    <CircularProgress />
  );
}

export default Comment;
