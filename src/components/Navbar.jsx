import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const onLogout = () => {
    auth.signOut();
    navigate("/");
    console.log("logged out");
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setMessage(auth.currentUser.displayName);
      } else {
        setMessage("Daily Blog");
      }
    });
  }, [onAuthStateChanged]);

  return (
    <div className="navbar bg-neutral shadow">
      <div className="flex-1">
        <a
          onClick={() => navigate("/")}
          className="btn btn-ghost normal-case text-xl text-primary"
        >
          {auth.currentUser ? `${message}'s Blog` : <p>{message}</p>}
        </a>
      </div>
      <div className="flex-none gap-2">
        {/* Logout/profile option for logged in users only */}
        {auth.currentUser ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-primary rounded-box w-52"
            >
              <li onClick={() => navigate("/profile")}>
                <a className="justify-between ">Profile</a>
              </li>
              <li onClick={onLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          // No signed in user
          <div onClick={() => navigate("/signIn")} className=" btn btn-ghost">
            <p className="text-accent">Sign In</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
