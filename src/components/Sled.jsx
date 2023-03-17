import React, { useState, useEffect } from "react";
import "../App.css"; // App.cssへの相対パスを指定

export function Sled() {
  const [threadList, setThreadList] = useState([]);

  useEffect(() => {
    async function fetchThreadList() {
      try {
        const response = await fetch(
          "https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch threads");
        }
        const data = await response.json();
        setThreadList(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchThreadList();
  }, []);

  const renderThreads = () => {
    return threadList.map((thread) => (
      <div className="container" key={thread.id}>
        <h2 className="title">{thread.title}</h2>
        <p className="id">{thread.id}</p>
        <p className="description">{thread.description}</p>
      </div>
    ));
  };

  return (
    <div className="sled-container">
      <header h1>掲示板</header>
      <h1>新着スレッド</h1>
      <div>{renderThreads()}</div>
    </div>
  );
}
