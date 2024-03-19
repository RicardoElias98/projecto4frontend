import React, { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import "../general.css";

function EditProfileButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Edit Profile</button>
    </>
  );
}

export default EditProfileButton;
