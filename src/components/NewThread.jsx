import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export function NewThread() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (event) => {
    event.preventDefault();
    fetch(
      "https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads",
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ title: event.target.title.value }),
      }
    ).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="sled-container">
      <header>
        <div className="header-left">掲示板</div>
      </header>
      <h1>スレッド新規作成</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title"></label>
          <input
            id="title"
            {...register("title", { required: "タイトルを入力してください" })}
            placeholder="スレッドタイトル"
          />
          {errors.title && (
            <p className="error-message">{errors.title.message}</p>
          )}
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          作成
        </button>
      </form>
      <div className="underform-left">
        <Link to={"/"}>Topに戻る</Link>
      </div>
    </div>
  );
}
