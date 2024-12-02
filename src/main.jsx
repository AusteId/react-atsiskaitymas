import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import WelcomePage from "./components/WelcomePage.jsx";
import BookRegistration from "./components/BookRegistration.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<WelcomePage />} />
          <Route path="register" element={<BookRegistration />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
