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
        <h1 className="pageHeader">Forgot Password</h1>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <Link to="/sign-in">Sign In</Link>

          <div className="flex">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
