import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import HomePage from "./pages/HomePage.jsx";
import Create from "./pages/Create.jsx";
import toast, { Toaster } from "react-hot-toast";
import useUserStore from "./store/user.js";
import Spinner from "./components/Spinner.jsx";

function App() {
  const [loading, setLoading] = useState(false);
  const { currentUser, fetchData, logOut } = useUserStore();
  const navigate = useNavigate();

  const handleFetchData = async () => {
    setLoading(true);
    console.log("currentUser before fetching : ", currentUser);
    const { success, message } = await fetchData();
    console.log("currentUser after fetching : ", currentUser);
    if (success === true) {
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
      logOut();
      navigate("/login");
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <>
      <Toaster />
      <div className="flex flex-1 items-center justify-center h-screen w-full">
        <Routes>
          <Route
            path="/"
            element={loading === true ? <Spinner /> : <HomePage />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
