import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import HomePage from "./pages/HomePage.jsx";
import Create from "./pages/Create.jsx";
import toast, { Toaster } from "react-hot-toast";
import useUserStore from "./store/user.js";

function App() {
  const { fetchData, logOut } = useUserStore();
  const navigate = useNavigate();

  const handleFetchData = async () => {
    const { success, message } = await fetchData();
    if (success === true) {
      navigate("/");
    } else {
      logOut();
      toast.error(message);
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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
