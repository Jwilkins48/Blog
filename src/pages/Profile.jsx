import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../../firebase.config";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  });

  const { name } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      console.log("cant update");
    }
  };

  return (
    <div className="profile">
      <header className="flex justify-between items-end">
        <p className="text-3xl ml-2 mt-2">My Profile</p>
        <button
          onClick={onLogout}
          type="button"
          className="badge badge-secondary p-3 font-bold mr-2 text-lg "
        >
          Logout
        </button>
      </header>

      <main className="bg-info shadow-xl my-6 mx-2 rounded p-1">
        <div>
          <p className="font-bold text-xl text-gray-700">Personal Details</p>
        </div>

        <div>
          <form className="flex mt-2 relative">
            <input
              className="p-2 rounded shadow mb-1 font-bold "
              value={name}
              disabled={!changeDetails}
              type="text"
              id="name"
              onChange={onChange}
            />
            <p
              className="cursor-pointer absolute top-2 text-accent right-40"
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails(!changeDetails);
              }}
            >
              {changeDetails ? (
                "Done"
              ) : (
                <i className="fa-regular fa-pen-to-square" />
              )}
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
