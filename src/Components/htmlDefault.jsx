import React from "react";
import "./HtmlDefault.css";
import LogoutButton from "./LogoutButton";
import { useState } from "react";

function HtmlDefault() {
  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="App" id="outer-container">
      <header className="header" id="header-app">
        <h1>Scrum Board</h1>
        <LogoutButton />
      </header>
      <div className="container">
        <aside className="aside" id="aside-app">
          <form onSubmit={handleSubmit}>
            <label htmlFor="taskName">Task Name:</label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              defaultValue=""
              onChange={handleChange}
            />
            <label htmlFor="taskDescription">Task Description:</label>
            <input
              type="text"
              id="taskDescription"
              name="taskDescription"
              defaultValue=""
              onChange={handleChange}
            />
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              defaultValue=""
              name="category"
              onChange={handleChange}
            >
              <option value="">Choose a category...</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>
            <label htmlFor="startDate">Initial Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              defaultValue=""
              onChange={handleChange}
            />
            <label htmlFor="endDate">Final Date:</label>
            <input
              type="date"
              id="endDate"
              defaultValue=""
              name="endDate"
              onChange={handleChange}
            />

            <button className="button"type="submit"> Add task</button>
          </form>
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
