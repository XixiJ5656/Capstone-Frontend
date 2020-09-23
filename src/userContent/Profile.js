import React from "react";
import authServices from "../services/authServices";

const Profile = () => {
  const currentUser = authServices.getCurrentUser();

  return (
    <div className="card">
      <header className="card card-block">
        <h5>
          <strong>Username:</strong>
          {currentUser.username}
        </h5>

        <h6>
          <strong>Email:</strong> {currentUser.email}
        </h6>
        <h6>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => (
              <div key={index}>{role}</div>
            ))}
        </h6>
      </header>

      <h3>Order History:</h3>
    </div>
  );
};

export default Profile;
