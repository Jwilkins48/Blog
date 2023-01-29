import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import Card from "../components/Card";
import signInImg from "../assets/resized.png";
import Footer from "../components/Footer";

function Home() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const [message, setMessage] = useState("");

  //Update user sign out
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setMessage("No user Signed in");
      } else {
        setMessage("User signed in");
      }
    });

    console.log(message);
  }, [onAuthStateChanged]);

  //Fetch user posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        //gathering data from posts collections
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("timestamp", "desc"), limit(10));

        //Execute query
        const querySnap = await getDocs(q);
        let posts = [];
        //adding id/data to each post in db
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

  //Delete post
  const onDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "posts", postId));
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
      console.log("Successfully deleted listing");
    }
  };

  //Navigate to edit page
  const onEdit = (postId) => navigate(`/editPost/${postId}`);

  return (
    <div className="relative">
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
        <div className="h-[vh] flex flex-col justify-start mt-20 text-center">
          <h1 className="font-bold text-4xl mb-2">
            Welcome! Sign in to make a post
          </h1>
          <div className="divider w-80 mx-auto mb-2">
            <i className="fa-solid fa-ghost" />
          </div>

          <figure>
            <img src={signInImg} alt="signIn" />
          </figure>
        </div>
      )}

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
                onEdit={() => onEdit(post.id)}
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
