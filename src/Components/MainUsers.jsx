import React, { useState, useEffect } from "react";
import "../general.css";
import { userStore } from "../stores/UserStore";
import User from "./User";

function MainSB() {
  const token = userStore.getState().token;
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    displayUsers();
  }, []);

  const displayUsers = () => {
    fetch("http://localhost:8080/project4backend/rest/user/all", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then(async function (response) {
        if (response.status === 403) {
          alert("User with this token is not found");
        } else if (response.status === 200) {
          const usersData = await response.json();
          console.log(usersData);
          setAllUsers(usersData);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  return (
    <div className="board">
      <div className="total-column">
        <div className="column-header" id="developer-header">
          <h2>Developer</h2>
        </div>
        <div
          className="board-container"
          id="developer-container"
          onDragOver={(event) => event.preventDefault()}
        >
          <section className="board-column" id="developer-column">
            {allUsers
              .filter((user) => user.role === "developer")
              .map((user) => (
                <User
                  key={user.id}
                  id={user.id}
                  username={user.username}
                  photo={user.photo}
                  role={user.role}
                />
              ))}
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="scrumMaster-header">
          <h2>Scrum Master</h2>
        </div>
        <div
          className="board-container"
          id="scrumMaster-container"
          onDragOver={(event) => event.preventDefault()}
        >
          <section className="board-column" id="scrumMaster-column"></section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="productOwner-header">
          <h2>Product Owner</h2>
        </div>
        <div
          className="board-container"
          id="productOwner-container"
          onDragOver={(event) => event.preventDefault()}
        >
          <section className="board-column" id="productOwner-column"></section>
        </div>
      </div>
    </div>
  );
}

export default MainSB;
