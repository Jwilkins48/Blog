import { doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase.config";

function editPost() {
  const auth = getAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    blogPost: "",
  });
  const { title, blogPost } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    //Create copy of form and adding timestamp
    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    };
    //fetch post with id equal to params.postId
    const docRef = doc(db, "posts", params.postId);
    //Update above document with new formData info
    await updateDoc(docRef, formDataCopy);
    console.log("Post saved");
    navigate(`/`);
  };
  //Update input value on change
  const onChange = (e) => {
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      //fetching post with id matching params.postId
      const docRef = doc(db, "posts", params.postId);
      const docSnap = await getDoc(docRef);
      //If post exists set formData with docSnap data
      if (docSnap.exists()) {
        setPost(docSnap.data());
        setFormData({ ...docSnap.data() });
      } else {
        navigate("/");
        console.log("No post");
      }
    };
    fetchPost();
  }, [params.postId, navigate]);

  //Sets userRef to logged in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({ ...formData, userRef: user.uid });
      }
    });
  }, [onAuthStateChanged]);

  return (
    <div className="items-start mt-10 justify-start">
      <form
        className="flex flex-col rounded-xl h-full  shadow w-90 mx-4"
        onSubmit={onSubmit}
      >
        <label className="text-3xl my-2 text-secondary font-bold">
          Blog Title
        </label>
        <input
          className="input text-blue-500 font-bold bg-blue-200 input-bordered input-primary-focus w-full "
          type="text"
          value={title}
          id="title"
          onChange={onChange}
          placeholder="Road Trip..."
        />

        <label className="text-2xl my-2 text-primary">Post</label>
        <textarea
          className="input text-lg text-primary pt-3 bg-blue-200 input-bordered input-primary-focus h-80 shadow-2xl w-full "
          type="text"
          value={blogPost}
          id="blogPost"
          onChange={onChange}
          placeholder="Your Story"
        />

        <button
          className="btn mt-10 shadow-xl bg-secondary text-blue-700"
          type="submit"
        >
          Update
        </button>
        <Link className="text-accent font-bold btn mt-4" to="/">
          Back Home
        </Link>
      </form>
    </div>
  );
}

export default editPost;
