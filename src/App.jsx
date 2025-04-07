import { useEffect, useRef, useState } from "react";
import "./App.css";

const otp_length = 5;

export default function App() {
  const [inputArr, setInputArr] = useState(new Array(otp_length).fill(""));
  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newArray = [...inputArr];
    newArray[index] = value.slice(-1);
    setInputArr(newArray);

    if (value && index < otp_length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  return (
    <div className="App">
      <h1>Please enter your OTP</h1>
      <div className="otp-container">
        {inputArr.map((val, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={val}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onChange={(e) => handleInputChange(e, index)}
            ref={(el) => (inputRef.current[index] = el)}
            className="otp-input"
          />
        ))}
      </div>
    </div>
  );
}
