import React, { useState } from "react";
import "../general.css";

function User({ id, username, photo, role }) {
  let roleClass = "";

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

  return (
    <>
    <div
      className={`role ${roleClass}`}
      draggable="true"
      onDragStart={handleDragStart}
    >
      <div className="photoUser">
        <img src={photo} alt="User" className="photo-user" />
      </div>
      {username}
    </div>
  </>
  );
}

export default User;
