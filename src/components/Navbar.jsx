import React from "react";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate("/");
    console.log("logged out");
  };

  return (
    <div className="navbar bg-pink-200 shadow">
      <div className="flex-1">
        <a
          onClick={() => navigate("/")}
          className="btn btn-ghost normal-case text-xl"
        >
          {auth.currentUser
            ? `${auth.currentUser.displayName}'s Blog`
            : "Welcome"}
        </a>
      </div>
      <div className="flex-none gap-2">
        {auth.currentUser ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li onClick={() => navigate("/profile")}>
                <a className="justify-between">Profile</a>
              </li>
              <li onClick={onLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <div
            onClick={() => navigate("/signIn")}
            className="mr-6 btn btn-ghost"
          >
            <p>Sign In</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
