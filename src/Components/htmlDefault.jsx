import React from "react";
import "../general.css";
import LogoutButton from "./LogoutButton";

import AsideAddTask from "./AsideAddTask";
import MainSB from "./MainSB";

function HtmlDefault() {
  return (
    <div className="App" id="outer-container">
      <header className="header" id="header-app">
        <h1>Scrum Board</h1>
        <LogoutButton />
      </header>
      <div className="container">
        <aside className="aside" id="aside-app"> 
        <AsideAddTask/>
        </aside>
        <main className="main" id="main-app">
          <MainSB/>
        </main>
      </div>
      <footer className="footer" id="footer-app">
        {/* Conteúdo do footer */}
      </footer>
    </div>
  );
}

export default HtmlDefault;
