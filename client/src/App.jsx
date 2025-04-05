/** @format */

import React from "react";
import Playground from "./components/Playground/Playground";
import HomePage from "./components/HomePage/index";
import Onboarding from "./components/Onboarding/index";
import SignUpForm from "./components/SignUpForm/index";
import LoginForm from "./components/LoginForm/index";
import StorePage from "./pages/StorePage";
import "./App.css";
// import { Canvas } from "@react-three/fiber";
// import setUpCamera from "./utils/cameraUtils/camera";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    // <>
    //   <Playground />
    //   {/* <StorePage /> */}
    // </>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/onboarding' element={<Onboarding />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/store' element={<StorePage />} />
        <Route path='/customize/:carId' element={<Playground />} />
      </Routes>
    </Router>
  );
};

export default App;
