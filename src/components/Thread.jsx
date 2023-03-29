import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function Thread() {
  const { thread_id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(
          `https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${thread_id}/posts`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        setComments(data.posts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchComments();
  }, [thread_id]);

  function handleNewCommentChange(event) {
    setNewComment(event.target.value);
  }

  async function handleNewCommentSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${thread_id}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post: newComment }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create new comment");
      }
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>投稿一覧</h2>
      {comments.map((comment) => (
        <div key={comment.id}>{comment.post}</div>
      ))}
      <form onSubmit={handleNewCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={handleNewCommentChange}
        />
        <button type="submit">投稿する</button>
      </form>
    </div>
  );
}
