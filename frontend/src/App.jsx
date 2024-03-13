import "./App.css";
import ContentTop from "./components/ContentTop/ContentTop";
import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import ContentMain from "./components/Contentmain/ContentMain";
import SignIn from "./components/User/SignIn";
import SignUp from "./components/User/SignUp";
import React from "react";

import OptimizePortpolio from "./components/Pages/OptimizePortpolio/OptimizePortpolio";//when removing this getting unexpected styles error

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
      <div className="app">
        
        <Structure/>
          
        
      </div></BrowserRouter>
    </React.StrictMode>
  );
}

function Structure() {
  const location = useLocation();
  return <>
  
  <div className="main-content">
  {location.pathname !== "/signin" && location.pathname !== "/signup" && (
        <ContentTop />
      )}
    
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<ContentMain />} />
    </Routes>
  </div></>
}

export default App;
