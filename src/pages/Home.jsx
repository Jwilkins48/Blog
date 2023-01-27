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
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { v4 as uuidv4 } from "uuid";
import Card from "../components/Card";

function Home() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const [createNewPost, setCreateNewPost] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const auth = getAuth();
        //gathering data from posts collections
        const postsRef = collection(db, "posts");
        const q = query(
          postsRef,
          // where("userRef", "==", auth.currentUser.uid),
          orderBy("timestamp", "desc")
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
        console.log(posts);
      } catch (error) {
        console.log("Could not fetch");
      }
    };
    fetchPosts();
  }, [auth.currentUser?.uid]);

  const onDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "posts", postId));
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
      console.log("Successfully deleted listing");
    }
  };

  return (
    <div>
      {/* Display name if logged in */}
      {auth.currentUser ? (
        <div>
          <div className="flex justify-between mt-3 items-center">
            <h1 className="text-2xl ml-3">
              Welcome Back{" "}
              <span className="text-primary font-bold">
                {auth.currentUser.displayName}!
              </span>
            </h1>
            <Link className="btn mr-3" to="/createPost">
              Add Post
            </Link>
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
            {posts.map((post) => (
              <Card
                key={post.id}
                post={post.data}
                id={post.id}
                onDelete={() => onDelete(post.id)}
              />
            ))}
          </main>
        </>
      ) : (
        "No Posts"
      )}
    </div>
  );
}

export default Home;
