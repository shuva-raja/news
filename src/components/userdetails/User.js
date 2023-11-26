import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";
const User = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/info", {
        withCredentials: true, // Include cookies
      })
      .then((response) => {
        setUser(response.data.user);
        console.log("User Data:", response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  // The empty dependency array ensures the effect runs only once on component mount

  return (
    <div  className="user-container">
      <h2>User Information</h2>
      {user ? (
        <div className="user-details">
          <p>User ID: {user._id}</p>
          <p>Name: {user.name}</p>
          <p>favouritemovie: {user.favouritemovie}</p>
          <p>Email:{user.email}</p>
          
          {/* Add more user details as needed */}
        </div>
      ) : (
        <p className="loading-message">Loading user data...</p>
      )}
    </div>
  );
};

export default User;
