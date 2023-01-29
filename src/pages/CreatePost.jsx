import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";

function CreatePost() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    blogPost: "",
  });
  const { title, blogPost } = formData;

  // On Form Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    //copying form info and adding timestamp
    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    };
    //Adding form copy to posts collection
    await addDoc(collection(db, "posts"), formDataCopy);
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

  //If user is signed in add userRef to formData
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({ ...formData, userRef: user.uid });
      }
    });
  }, [onAuthStateChanged]);

  return (
    <div className="mt-10 lg:mt-20 lg:justify-center lg:flex w-full">
      <form
        className="flex flex-col rounded-xl h-full w-90 lg:w-[50rem] mx-4"
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
          Submit
        </button>
        <Link className="text-accent font-bold btn mt-4" to="/">
          Back Home
        </Link>
      </form>
    </div>
  );
}

export default CreatePost;
