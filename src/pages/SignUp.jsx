import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../../firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password } = formData;

  const navigate = useNavigate();

  //Create User Account
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //Create user with form info
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });

      //copy of user info with password removed and timestamp
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      //Placing user info into users collection
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
    } catch (error) {
      console.log("Failure to create account");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <div>
        <header>
          <h3>Welcome!</h3>
        </header>

        <form onSubmit={onSubmit}>
          <div className="nameDiv">
            <input
              type="text"
              value={name}
              onChange={onChange}
              id="name"
              placeholder="Name"
            />
          </div>

          <div className="emailDiv">
            <input
              type="email"
              value={email}
              onChange={onChange}
              id="email"
              placeholder="Email"
            />
          </div>

          <div className="passwordDiv">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onChange}
              id="password"
              placeholder="Password"
            />
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide password" : "Show password"}
            </div>
          </div>

          <button className="btn" type="submit">
            Sign Up
          </button>
          <Link to="/signIn">Sign In</Link>
        </form>
      </div>
    </>
  );
}

export default SignUp;
