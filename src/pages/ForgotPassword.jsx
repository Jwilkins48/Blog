import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => setEmail(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      alert("Sent");
    } catch (error) {
      console.log("cant reset email");
    }
  };

  return (
    <div>
      <header>
        <h1 className="text-4xl my-3 mx-2">Forgot Password</h1>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            className="input text-blue-500 font-bold bg-blue-200 input-bordered ml-2 input-primary-focus w-80 "
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="flex hover:text-primary text-xl">
            <div className="signInText ml-3 mt-3 cursor-pointer">
              Send Reset Link{" "}
            </div>
            <button className="signInButton">
              <i className=" fa-solid fa-arrow-right mt-4 px-2 "></i>
            </button>
          </div>

          <Link className="ml-3 text-xl hover:text-secondary" to="/sign-in">
            Sign In
          </Link>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
