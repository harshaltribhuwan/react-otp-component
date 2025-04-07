import { useState } from "react";
import { motion } from "framer-motion";
import OtpInput from "./Components/OtpInput";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <motion.div
      className={`App ${isDarkMode ? "dark" : ""}`}
      animate={{
        backgroundColor: isDarkMode ? "#111" : "#fdfdfd",
        color: isDarkMode ? "#e0e0e0" : "#1a1a1a",
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="otp-form">
        <h1 className="title">🔐 Verify your OTP</h1>

        <OtpInput otpLength={5} />

        <button className="toggle-theme" onClick={toggleTheme}>
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </motion.div>
  );
}

export default App;
