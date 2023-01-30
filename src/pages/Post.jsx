import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteDoc, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase.config";

function Post() {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const postRef = doc(db, "posts", params.postId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        setPost(postSnap.data());
      }
    };
    fetchPost();
  }, [params.postId]);
  return (
    <div className="w-full">
      <div className="bg-base-200 w-86 h-[45rem] p-10 m-auto mx-4 shadow-lg py-4 my-5 relative animate__animated animate__fadeIn lg:w-[60rem] lg:m-auto lg:mt-16">
        <header>
          <h1 className="text-5xl text-primary my-3">{post?.title}</h1>
          <div className="divider mt-0"></div>
        </header>
        <p className="text-2xl text-secondary">{post?.blogPost}</p>
      </div>
    </div>
  );
}

export default Post;
