import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase.config";

function Home() {
  const auth = getAuth();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, "posts");
        const q = query(
          postsRef,
          where("userRef", "==", auth.currentUser.uid),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        const querySnap = await getDocs(q);
        let posts = [];
        querySnap.forEach((doc) => {
          return posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(posts);
      } catch (error) {
        console.log("Could not fetch");
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {auth.currentUser ? (
        <div>
          <div className="flex justify-between mt-3 items-center">
            <h1 className="text-2xl ml-2">
              Welcome Back{" "}
              <span className="text-primary font-bold">
                {auth.currentUser.displayName}!
              </span>
            </h1>
            <button className="btn mr-2">Add Post</button>
          </div>
          <div className="divider w-80 mx-auto">
            <i className="fa-solid fa-ghost" />
          </div>
        </div>
      ) : (
        "Welcome! Sign in to make a post"
      )}
    </div>
  );
}

export default Home;
