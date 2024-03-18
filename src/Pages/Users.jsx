import React from "react";
import "../general.css";
import LogoutButton from "../Components/LogoutButton";
import { Link } from "react-router-dom";
import Photo from "../Components/Photo";
import { userStore } from "../stores/UserStore";
import MainUsers from "../Components/MainUsers";

function Users() {
  const userPhoto = userStore.getState().userPhoto;
  return (
    <div className="App" id="outer-container">
      <header className="header" id="header-app">
        <h1>Scrum Board</h1>
        <h2>
          <Link to="/users">Users</Link>
        </h2>
        <Photo src={userPhoto} />
        <LogoutButton />
      </header>
      <div className="container">
        <aside className="aside" id="aside-app"></aside>
        <main className="main" id="main-app">
          <MainUsers />
        </main>
      </div>
      <footer className="footer" id="footer-app">
        {/* Conteúdo do footer */}
      </footer>
    </div>
  );
}

export default Users;
