import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./common/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Outlet />
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
