import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";

function CreatePost() {
  const auth = getAuth();

  const [formData, setFormData] = useState({
    title: "",
    blogPost: "",
    // feeling: "",
  });
  const { title, blogPost } = formData;

  const navigate = useNavigate();
  const isMounted = useRef(true);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "posts"), formDataCopy);
    console.log("Post saved");
    navigate(`/`);
  };

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
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return (
    <div className="flex items-start mt-10 justify-start h-[92vh]">
      <form
        className="flex flex-col rounded-xl h-full  shadow w-full mx-4"
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
      </form>
    </div>
  );
}

export default CreatePost;
