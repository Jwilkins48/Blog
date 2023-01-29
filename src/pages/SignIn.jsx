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
      <div className="lg:flex flex-col items-center justify-center lg:h-[80vh]">
        <div className="lg:bg-base-300 lg:p-12 lg:py-20 lg:shadow-2xl lg:rounded-xl">
          <header>
            <h3 className="text-3xl lg:text-5xl my-6 font-bold text-primary">
              Welcome Back!
            </h3>
          </header>

          <form className="flex flex-col mx-2 w-82 lg:w-96" onSubmit={onSubmit}>
            <div className="emailDiv">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
                id="email"
                className="input input-bordered input-primary-focus w-full "
              />
            </div>

            <div className="passwordDiv my-4 flex relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={onChange}
                id="password"
                placeholder="Password"
                className="input input-bordered input-primary-focus w-full "
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
            </div>

            <button
              className="btn lg:btn-info my-1"
              onClick={onChange}
              type="submit"
            >
              Sign In
            </button>
            <Link
              to="/forgotPassword"
              className="text-primary font-bold my-2 ml-2"
            >
              Forgot Password?
            </Link>

            <Link className=" text-primary font-bold my-2 ml-2" to="/signUp">
              Sign Up
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
