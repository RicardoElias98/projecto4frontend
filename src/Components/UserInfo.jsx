import React, { useState } from "react";

function UserInfo({
  isOpen,
  onClose,
  username,
  name,
  email,
  contactNumber,
  userPhoto,
}) {
  const [isEditable, setIsEditable] = useState(false);

  const [formData, setFormData] = useState({
    username: username,
    name: name,
    email: email,
    contactNumber: contactNumber,
    userPhoto: userPhoto,
  });

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleClose = () => {
    onClose();
    setIsEditable(false);
  };

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="modal" id="userInfoModal">
      <div className="modal-content">
        <h2 className="h2">User Info</h2>

        <label className="h2" htmlFor="userName">
          Username:
        </label>
        <input
          type="text"
          id="usernaName"
          name="username"
          value={formData.username}
          onChange={handleChange}
          readOnly={!isEditable}
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
          readOnly={!isEditable}
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
          readOnly={!isEditable}
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
          readOnly={!isEditable}
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
          readOnly={!isEditable}
        />
        {isEditable ? (
          <>
            <button className="button" /*onClick={handleConfirm}*/>
              {" "}
              Confirm{" "}
            </button>
            <button className="button" onClick={handleClose}>
              {" "}
              Cancel{" "}
            </button>
            <button className="button" /*onClick={handleDelete}*/>
              {" "}
              Delete{" "}
            </button>
          </>
        ) : (
          <>
            <button className="button" onClick={handleEditClick}>
              Edit
            </button>
            <button className="button" onClick={handleClose}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
