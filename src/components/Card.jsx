import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Card({ post, id, onDelete }) {
  const auth = getAuth();
  return (
    <div
      className={
        post.userRef === auth.currentUser?.uid
          ? "card w-96 mx-auto border-2 p-2 my-5 relative"
          : "hidden"
      }
    >
      <div className="ml-2">
        <header>
          <h1 className="text-3xl">{post.title}</h1>
        </header>

        <h3>{post.blogPost}</h3>
      </div>

      {onDelete && (
        <button
          className="absolute right-5 top-2"
          onClick={() => onDelete(post.id, post.name)}
        >
          <i className="fa-solid text-primary shadow fa-trash" />
        </button>
      )}
    </div>
  );
}

export default Card;
