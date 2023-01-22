import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //If user account exists sign in and redirect home
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      console.log("No User");
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
          <h3>Welcome Back!</h3>
        </header>

        <form onSubmit={onSubmit}>
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
          </div>

          <button className="btn" onClick={onChange} type="submit">
            Sign In
          </button>
          <Link to="/signUp">Sign Up</Link>
        </form>
      </div>
    </>
  );
}

export default SignIn;
