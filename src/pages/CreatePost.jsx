import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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
    <div>
      <form onSubmit={onSubmit}>
        <label>Title:</label>
        <input type="text" value={title} id="title" onChange={onChange} />

        <label>Post:</label>
        <input type="text" value={blogPost} id="blogPost" onChange={onChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
