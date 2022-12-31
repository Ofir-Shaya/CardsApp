import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import SignUpBiz from "./components/SignUpBiz";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/PageFooter";
import ProtectedRoute from "./components/common/ProtectedRoute";

import CardCreate from "./components/Card/CardCreate";
import CardDelete from "./components/Card/CardDelete";
import CardMy from "./components/Card/CardMy";
import CardEdit from "./components/Card/CardEdit";

function App() {
  return (
    <div className="app d-flex flex-column min-vh-100">
      <ToastContainer />
      <header>
        <Navbar />
      </header>

      <main className="flex-fill container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="/my-cards/delete/:id"
            element={
              <ProtectedRoute onlyBiz>
                <CardDelete />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cards/edit/:id"
            element={
              <ProtectedRoute onlyBiz>
                <CardEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-card"
            element={
              <ProtectedRoute onlyBiz>
                <CardCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-cards"
            element={
              <ProtectedRoute onlyBiz>
                <CardMy />
              </ProtectedRoute>
            }
          />
          <Route path="sign-up-biz" element={<SignUpBiz />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-out" element={<SignOut />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
