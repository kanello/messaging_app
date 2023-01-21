import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Channel from "./components/Channel";
import MobileSidebar from "./components/MobileSidebar";
import MobileReplies from "./components/MobileReplies";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/channel/:id" element={<Channel />} />
        <Route path="/channels" element={<MobileSidebar />} />
        <Route path="/replies/:id" element={<MobileReplies />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
