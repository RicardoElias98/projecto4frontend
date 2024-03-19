import React, { useState } from "react";
import EditProfileModal from "./EditProfileModal";

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
      {isModalOpen && <EditProfileModal onClose={closeModal}  />}
    </>
  );
}

export default EditProfileButton;
