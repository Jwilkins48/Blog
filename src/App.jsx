import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Post from "./pages/Post";

function App() {
  return (
    <div className="relative">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/editPost/:postId" element={<EditPost />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
