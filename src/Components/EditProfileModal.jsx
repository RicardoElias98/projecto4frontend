import React from "react";
import { useState } from "react";

function EditProfileModal(
  isOpen,
  onClose,
  username,
  name,
  email,
  contactNumber,
  userPhoto,
  role
) {
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: username,
    name: name,
    email: email,
    contactNumber: contactNumber,
    userPhoto: userPhoto,
    role: role,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" id="userInfoModal">
      <div className="modal-content">
        <h2 className="h2">Edit Profile</h2>

        <label className="h2" htmlFor="userName">
          Username:
        </label>
        <input
          type="text"
          id="usernaName"
          name="username"
          value={formData.username}
          onChange={handleChange}
          readOnly={true}
          className={"input-read-only"}
        />
        <label className="h2" htmlFor="nameUser">
          Name of the User:
        </label>
        <input
          type="text"
          id="nameUser"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label className="h2" htmlFor="email">
          Email:
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label className="h2" htmlFor="phoneNumber">
          Phone Number:
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
        />
        <label className="h2" htmlFor="photo">
          Photo:
        </label>
        <input
          type="text"
          id="photo"
          name="userPhoto"
          value={formData.userPhoto}
          onChange={handleChange}
        />
        <button> Confirm </button>
        <button> Cancel onClick={handleClose} </button>
      </div>
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        username={username}
        name={name}
        email={email}
        contactNumber={contactNumber}
        userPhoto={userPhoto}
        role={role}
      />
    </div>
  );
}

export default EditProfileModal;
