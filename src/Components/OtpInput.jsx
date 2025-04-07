import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";

const OtpInput = ({ otpLength = 5 }) => {
  const [inputArr, setInputArr] = useState(new Array(otpLength).fill(""));
  const inputRef = useRef([]);
  const [isOtpComplete, setIsOtpComplete] = useState(false);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    const isComplete = inputArr.every((digit) => digit !== "");
    setIsOtpComplete(isComplete);
  }, [inputArr]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newArray = [...inputArr];
    newArray[index] = value.slice(-1);
    setInputArr(newArray);

    if (value && index < otpLength - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      inputRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft") {
      inputRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight") {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, otpLength);
    if (!/^\d+$/.test(pasted)) return;

    const newArray = [...inputArr];
    for (let i = 0; i < otpLength; i++) {
      newArray[i] = pasted[i] || "";
    }
    setInputArr(newArray);
    inputRef.current[Math.min(pasted.length, otpLength - 1)]?.focus();
  };

  return (
    <div className="otp-form">
      <div className="otp-input-wrapper">
        {inputArr.map((val, index) => (
          <input
            key={index}
            type="text"
            value={val}
            maxLength={1}
            className="otp-input"
            ref={(el) => (inputRef.current[index] = el)}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
          />
        ))}
      </div>

      <AnimatePresence>
        {isOtpComplete && (
          <motion.div
            className="success-animation"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            ✅ OTP Entered!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OtpInput;
