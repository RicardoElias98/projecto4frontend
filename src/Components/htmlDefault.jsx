import React from "react";
import "./HtmlDefault.css";
import LogoutButton from "./LogoutButton";

function HtmlDefault() {
  return (
    <div className="App" id="outer-container">
      <header className="header" id="header-app">
        <h1>Scrum Board</h1>
        <LogoutButton />
      </header>
      <div className="container">
        <aside className="aside" id="aside-app">
          {/* Conteúdo do aside */}
        </aside>
        <main className="main" id="main-app">
          <div className="total-column">
            <div className="column-header" id="to-do-header">
              <h2>To Do</h2>
            </div>

            <div className="board-container" id="to-do-container">
              <section className="board-column" id="to-do-column">
                {/* tasks */}
              </section>
            </div>
          </div>
          <div className="total-column">
          <div className="column-header" id="doing-header">
            <h2>Doing</h2>
          </div>
          <div className="board-container" id="doing-container">
            <section className="board-column" id="doing-column">
              {/* tasks */}
            </section>
          </div>
          </div>
           <div className="total-column">
          <div className="column-header" id="done-header">
            <h2>Done</h2>
          </div>
          <div className="board-container" id="done-container">
            <section className="board-column" id="done-column">
              {/* tasks */}
            </section>
          </div>
          </div>
        </main>
      </div>
      <footer className="footer" id="footer-app">
        {/* Conteúdo do footer */}
      </footer>
    </div>
  );
}

export default HtmlDefault;
