import { useNavigate, Link } from "react-router-dom";

export function NewThread() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      "https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads",
      {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ title: event.target.title.value }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className="sled-container">
      <h1>新規投稿</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">
            タイトル
            <input type="text" className="text" name="title" />
          </label>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          投稿
        </button>
      </form>
      <div className="underform-left">
        <Link to={"/"}>Topに戻る</Link>
      </div>
    </div>
  );
}
