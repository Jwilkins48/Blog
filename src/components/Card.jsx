import { getAuth } from "firebase/auth";

function Card({ post, id, onDelete }) {
  const auth = getAuth();
  return (
    <div
      className={
        post.userRef === auth.currentUser?.uid
          ? "card w-86 mx-4 h-72 border-accent shadow-2xl border-2 p-2 py-4 my-5 relative"
          : "hidden"
      }
    >
      <div className="ml-2 w-80 ">
        <header>
          <h1 className="text-4xl text-secondary font-bold">{post.title}</h1>
        </header>

        <div className="divider mt-0"></div>

        <h3>{post.blogPost}</h3>
      </div>

      {onDelete && (
        <button
          className="absolute right-5 top-5"
          onClick={() => onDelete(post.id, post.name)}
        >
          <i className="fa-solid text-primary shadow fa-trash" />
        </button>
      )}
    </div>
  );
}

export default Card;
