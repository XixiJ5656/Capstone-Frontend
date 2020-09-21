import React from "react";
import authServices from "../services/authServices";

const Profile = () => {
  const currentUser = authServices.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>User Name:</strong>
          {currentUser.username}
        </h3>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </header>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <h3>Order History:</h3>
    </div>
  );
};

export default Profile;
