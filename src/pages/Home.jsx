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
        //gathering data from posts collections
        const postsRef = collection(db, "posts");
        const q = query(
          postsRef,
          // where("userRef", "==", auth.currentUser.uid),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        //Execute query
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
      {/* Display name if logged in */}
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
        </div>
      ) : (
        <div className="text-2xl w-72 ml-8 my-3 font-bold">
          Welcome! Sign in to make a post
        </div>
      )}
      <div className="divider w-80 mx-auto">
        <i className="fa-solid fa-ghost" />
      </div>

      {/* Display posts */}
      {posts && posts.length > 0 ? (
        <>
          <main>
            <div className="card w-80 mx-auto bg-secondary p-3">
              {posts.map((post) => (
                <h3 key={post.data.userRef}>{post.data.blogPost}</h3>
              ))}
            </div>
          </main>
        </>
      ) : (
        "No Posts"
      )}
    </div>
  );
}

export default Home;
