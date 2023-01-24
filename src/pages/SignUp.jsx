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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password } = formData;

  const navigate = useNavigate();

  //Create User Account
  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
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
        console.log(error);
      }
    } else {
      alert("Passwords must match");
    }

    if (password.length < 6) {
      alert("Password must be greater than 6 characters");
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
          <h3 className="text-3xl my-6 ml-4 font-bold text-primary">
            Welcome!
          </h3>
        </header>

        <form className="w-80 ml-2 " onSubmit={onSubmit}>
          <div className="nameDiv">
            <input
              type="text"
              value={name}
              onChange={onChange}
              id="name"
              placeholder="Name"
              className="input input-bordered input-primary-focus w-full mb-4"
            />
          </div>

          <div className="emailDiv">
            <input
              type="email"
              value={email}
              onChange={onChange}
              id="email"
              placeholder="Email"
              className="input input-bordered input-primary-focus w-full mb-4"
            />
          </div>

          <div className="passwordDiv relative">
            {/* <div className="tooltip tooltip-open tooltip-top" data-tip="Password must be at least 6 characters"> */}
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onChange}
              id="password"
              placeholder="Password"
              className="input input-bordered input-primary-focus w-full mb-4"
            />
            <div
              className="absolute right-5 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa-regular fa-eye-slash" />
              ) : (
                <i className="fa-regular fa-eye" />
              )}
            </div>

            <div className="confirmPasswordDiv">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                placeholder="Confirm Password"
                className="input input-bordered input-primary-focus w-full mb-4"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <button className="btn" type="submit">
              Sign Up
            </button>
            <Link className="mt-3 ml-1 text-primary font-bold" to="/signIn">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
