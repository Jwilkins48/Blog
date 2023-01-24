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

  const { name, email } = formData;

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
      <header>
        <p>My Profile</p>
        <button onClick={onLogout} type="button" className="logOut">
          Logout
        </button>
      </header>

      <main>
        <div>
          <p>Personal Details</p>
          <p
            className="cursor-pointer"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails(!changeDetails);
            }}
          >
            {changeDetails ? "Done" : "Edit"}
          </p>
        </div>

        <div>
          <form>
            <input
              value={name}
              disabled={!changeDetails}
              type="text"
              id="name"
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
