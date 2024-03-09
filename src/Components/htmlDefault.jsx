import React from "react";
import "./htmlDefault.css";

function htmlDefault() {
  return (
    <div className="App" id="outer-container">
      <header className="header" id="header-app">
        <h1>Scrum Board</h1>
      </header>
      <div className="container">
        <aside className="aside" id="aside-app">
          {/* Conteúdo do aside aqui */}
        </aside>
        <main className="main" id="main-app">
          {/* Conteúdo do main aqui */}
        </main>
      </div>
      <footer className="footer" id="footer-app">
        {/* Conteúdo do footer aqui */}
      </footer>
    </div>
  );
}

export default htmlDefault;
