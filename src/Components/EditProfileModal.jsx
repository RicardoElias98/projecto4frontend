import React, { useState } from "react";
import { userStore } from "../stores/UserStore";

function EditProfileModal({ onClose, user }) {
  const [formData, setFormData] = useState({
    username: user.username,
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber,
    userPhoto: user.userPhoto,
    password: user.password,
  });

  const updateLoginUser = userStore((state) => state.updateLoginUser);

  const token = userStore.getState().token;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    console.log(formData);
    fetch("http://localhost:8080/project4backend/rest/user/update", {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(formData),
    }).then(function (response) {
      if (response.status === 404) {
        console.log("User not found");
      } else if (response.status === 406) {
        console.log("Failed. User not updated. All elements are required");
      } else if (response.status === 400) {
        console.log("Failed. User not updated. All elements are required");
      } else if (response.status === 200) {
        console.log("User updated");
        updateLoginUser(formData);
        onClose();
      }
    });
  };

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
        <label className="h2" htmlFor="password">
          Current Password:
        </label>
        <input
          type="text"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label className="h2" htmlFor="newpassword">
          New Password:
        </label>
        <input
          type="text"
          id="newpassword"
          name="newpassword"
          value=""
          onChange={handleChange}
        />
        <button onClick={handleConfirm}> Confirm </button>
        <button onClick={handleCancel}> Cancel </button>
      </div>
    </div>
  );
}

export default EditProfileModal;
