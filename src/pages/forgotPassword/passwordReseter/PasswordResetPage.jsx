import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "../../../components/Notification/Notifications.jsx";
import { delay } from "../../../additionals/delay.js";

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [key, setKey] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = localStorage.getItem("email");
      const response = await axios.post(
        "https://defteam.onrender.com/api-auth/reset_password/",
        {
          email: email,
          new_password: newPassword,
        }
      );
      if (response.status === 200) {
        console.log(response.data.message);
        localStorage.removeItem("email");
        setNotification({
          type: "success",
          text: "Password reseted successfuly!",
        });

        delay(navigate,'/log',900)
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setNotification({
        type: "error",
        text: "Invalid OTP entered",
      });

      setKey(key + 1);
    }
  };

  return (
    <div>
      <h1>Password Reset</h1>
      {notification && (
        <Notification
          type={notification.type}
          text={notification.text}
          count={key}
        />
      )}
      <form onSubmit={handleSubmit}>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordResetPage;
