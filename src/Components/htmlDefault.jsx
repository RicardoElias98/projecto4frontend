import React from "react";
import "./HtmlDefault.css";

function HtmlDefault() {
  return (
    <div className="App" id="outer-container">
      <header className="header" id="header-app">
        <h1>Scrum Board</h1>
        <button> Logout </button>
      </header>
      <div className="container">
        <aside className="aside" id="aside-app">
          {/* Conteúdo do aside */}
        </aside>
        <main className="main" id="main-app">
          {/* Conteúdo do main */}
        </main>
      </div>
      <footer className="footer" id="footer-app">
        {/* Conteúdo do footer */}
      </footer>
    </div>
  );
}

export default HtmlDefault;
