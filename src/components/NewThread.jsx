import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NewThread() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com//threads/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create thread");
      }
      navigate("/Home"); // スレッド一覧ページに戻る
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="new-thread-container">
      <header>
        <h1>スレッド新規作成</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          タイトル:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>
        <label>
          説明:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>
        <button type="submit">スレッドを作成する</button>
      </form>
    </div>
  );
}
