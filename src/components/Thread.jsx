import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";

export function Thread() {
  const { thread_id } = useParams();
  const [comments, setComments] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // fetchComments関数を定義
  const fetchComments = useCallback(async () => {
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
  }, [thread_id]);

  useEffect(() => {
    fetchComments(); // fetchComments関数を直接呼び出し
  }, [thread_id, fetchComments]);

  // handleNewCommentSubmit関数の定義
  async function handleNewCommentSubmit(data) {
    try {
      const response = await fetch(
        `https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${thread_id}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post: data.newComment }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create new comment");
      }
      reset();
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  }

  const renderComments = () => {
    return comments.map((comment) => (
      <div className="container" key={comment.id}>
        <p className="post">{comment.post}</p>
      </div>
    ));
  };

  return (
    <div className="comment-header-container">
      <header className="header">
        <div className="header-left">掲示板</div>
        <div className="header-right">
          <Link to="/thread/new" className="new-thread-link">
            スレッドを立てる
          </Link>
        </div>
      </header>
      <div className="new-comment-title">
        <h2>投稿一覧</h2>
      </div>
      <div className="comments-container">{renderComments()}</div>
      <form
        className="new-comment-form"
        onSubmit={handleSubmit(handleNewCommentSubmit)}
      >
        <input
          className="new-comment-input"
          {...register("newComment", {
            required: "コメントを入力してください",
          })}
          placeholder="投稿しよう！"
        ></input>
        {errors.newComment && (
          <p className="error">{errors.newComment.message}</p>
        )}
        <button className="new-comment-button" type="submit">
          投稿
        </button>
      </form>
    </div>
  );
}
