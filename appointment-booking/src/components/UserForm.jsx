import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (userName.trim()) {
      navigate(`/slots?userName=${encodeURIComponent(userName)}`);
    } else {
      alert("Please enter a valid name");
    }
  };

  return (
    <div>
      <h1>Enter Your Name</h1>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default UserForm;
