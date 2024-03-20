import React, { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { userStore } from "../stores/UserStore";


function EditProfileButton() {
    const token = userStore.getState().token;
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
      {isModalOpen && <EditProfileModal onClose={closeModal} />}
    </>
  );
}

export default EditProfileButton;
