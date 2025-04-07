import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import OtpInput from "./Components/OtpInput";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const initialRef = useRef(true);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("theme"));
    setIsDarkMode(result ?? false);

    setTimeout(() => {
      setShowContent(true);
    }, 200);
  }, []);

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    localStorage.setItem("theme", JSON.stringify(isDarkMode));
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`App ${isDarkMode ? "dark" : ""}`}>
      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="otp-form">
            <h1 className="title">🔐 Verify your OTP</h1>

            <OtpInput otpLength={5} />

            <button className="toggle-theme" onClick={toggleTheme}>
              {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
