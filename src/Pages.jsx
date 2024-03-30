import React from "react";
// import Recipe from "./Recipe";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Client
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";

import Test from "./pages/Test/Test";

import NotFound from "./pages/NotFound";
import NotPermission from "./pages/NotPermission";

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<NotFound />} />
        <Route path="/not_permission" element={<NotPermission />} />

        {/* Client page */}
        <Route path="/" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
