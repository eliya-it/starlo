import { useEffect, useState } from "react";
import Navbar from "./components/UI/Navbar/Navbar";
import "./assets/css/style.css";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddRoom from "./pages/AddRoom";
import Me from "./pages/Me";
import Room from "./pages/Room";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer/Footer";
import { useDispatch } from "react-redux";
import Loader from "./components/UI/Loader/Loader";

import { authSuccess } from "./store/actions/actions";
import useLogout from "./hooks/useLogout";
import Message from "./components/UI/Message/Message";
import Bookings from "./pages/Bookings";
import { AnimatePresence } from "framer-motion";
import Rooms from "./pages/Rooms";
import { useSearchParams } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
let logoutTimer;

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [tokenExpDate, setTokenExpDate] = useState(null);
  const [curUser, setCurUser] = useLocalStorage("user");
  const { logout } = useLogout();
  const dispatch = useDispatch();
  useEffect(() => {
    if (curUser) {
      dispatch(
        authSuccess(
          curUser.name,
          curUser.photo,
          curUser.token,
          curUser.role,
          curUser.expiresIn,
          "LOGIN_SUCCESS"
        )
      );
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token && user.expiresIn) {
      const remainingTime =
        new Date(user.expiresIn).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, tokenExpDate]);

  return (
    <div className="app">
      <Navbar />
      {isLoading ? <Loader /> : null}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/me" exact element={<Me />} />
          <Route path="/add-room" exact element={<AddRoom />} />
          <Route path="/room/:slug" exact element={<Room />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/rooms" exact element={<Rooms />} />
          <Route path="/bookings" exact element={<Bookings />} />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
