import React, { useState } from "react";
import "../general.css";
import UserInfo from "./UserInfo";

function User({ username, name, email, contactNumber, role, photo }) {
  let roleClass = "";

  const [isUserInfoModalOpen, setUserInfoModalOpen] = useState(false);

  if (role === "developer") {
    roleClass = "dev";
  } else if (role === "user") {
    roleClass = "scrum-master";
  } else if (role === "Owner") {
    roleClass = "owner";
  }

  const handleDragStart = (event) => {
    event.dataTransfer.setData("user_id", username);
  };

  const handleOpenUserInfoModal = () => {
    setUserInfoModalOpen(true);
  };

  const handleCloseUserInfoModal = () => {
    setUserInfoModalOpen(false);
  };

  return (
    <>
      <div
        className={`role ${roleClass}`}
        draggable="true"
        onDragStart={handleDragStart}
        onDoubleClick={handleOpenUserInfoModal}
      >
        <div className="photoUser">
          <img src={photo} alt="User" className="photo-user" />
        </div>
        {username}
      </div>
      <UserInfo
        isOpen={isUserInfoModalOpen}
        onClose={handleCloseUserInfoModal}
        username={username}
        name={name}
        email={email}
        contactNumber={contactNumber}
        userPhoto={photo}
        role={role}
      />
    </>
  );
}

export default User;
