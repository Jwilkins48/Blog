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
    <div
      className={
        auth.currentUser
          ? "relative lg:h-auto pb-10 lg:w-fit m-auto lg:bg-base-300 lg:rounded px-5 lg:shadow-xl"
          : "relative"
      }
    >
      {/* Display name if logged in */}
      {auth.currentUser ? (
        <div>
          <div className="flex justify-between lg:justify-evenly pt-3 items-center">
            <h1 className="text-2xl lg:text-4xl lg:my-5 lg:ml-12 ml-2">
              Welcome Back{" "}
              <span className="text-primary font-bold">
                {auth.currentUser.displayName}!
              </span>
            </h1>
            <Link className="btn mr-2 lg:mr-12" to="/createPost">
              Add Post
            </Link>
          </div>
          <div className="divider w-[62%] hidden lg:flex mx-auto">
            <i className="fa-solid fa-ghost" />
          </div>
        </div>
      ) : (
        <div className="h-[vh] lg:bg-base-300 lg:shadow-xl flex flex-col lg:flex-row lg:justify-center lg:items-center justify-start mt-20 lg:mt-36 text-center">
          <h1 className="font-bold heading text-4xl lg:w-[25rem] lg:mt-10 mb-2">
            Welcome!{" "}
            <span
              className="link link-accent"
              onClick={() => navigate("/signIn")}
            >
              Sign in
            </span>{" "}
            to make a post
            <div className="divider w-80 hidden lg:flex text-lg mx-auto mt-6">
              <i className="fa-solid fa-ghost" />
            </div>
          </h1>
          <div className="divider w-80 lg:hidden mx-auto mb-2">
            <i className="fa-solid fa-ghost" />
          </div>

          <figure>
            <img className="lg:w-[35rem] m-auto" src={signInImg} alt="signIn" />
          </figure>
        </div>
      )}

      {/* Display posts */}
      {posts && posts.length > 0 ? (
        <>
          <main className="lg:w-[60rem] lg:mt-10 lg:m-auto ">
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
