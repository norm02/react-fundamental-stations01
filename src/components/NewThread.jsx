import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export function NewThread() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
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
        body: JSON.stringify({ title: data.title }),
      }
    ).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="new-thread-container">
      <header>
        <div className="header-left">掲示板</div>
      </header>
      <div className="new-thread-title">
        <h2>スレッド新規作成</h2>
      </div>
      <div className="new-thread-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title"></label>
          <input
            className="new-thread-input"
            id="title"
            {...register("title", { required: "タイトルを入力してください" })}
            placeholder="スレッドタイトル"
          ></input>
          {errors.title && (
            <p className="error-message">{errors.title.message}</p>
          )}
          <br />
          <button type="submit" className="new-thread-button">
            作成
          </button>
        </form>
        <div className="underform-left">
          <Link to={"/"}>Topに戻る</Link>
        </div>
      </div>
    </div>
  );
}
