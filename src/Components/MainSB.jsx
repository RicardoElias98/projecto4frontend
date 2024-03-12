import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../general.css";
import { userStore } from "../stores/UserStore";

function MainSB() {
  const token = userStore.getState().token;
  const [tasks, setTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  console.log("INICIAL", todoTasks);

  useEffect(() => {
    displayTasks();
  }, []);

  const displayTasks = () => {
    fetch("http://localhost:8080/project4backend/rest/task/all", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
    }).then(async function (response) {
      if (response.status === 401) {
        alert("Unauthorized");
      } else if (response.status === 200) {
        console.log("tasks found");
        const tasksData = await response.json();
        setTasks(tasksData);
        console.log("TasksData", tasksData);
        setTodoTasks(filterTasksByStatus(10));
        setDoingTasks(filterTasksByStatus(20));
        setDoneTasks(filterTasksByStatus(30));
        console.log("todo", todoTasks);
        console.log("doing", doingTasks);
        console.log("done", doneTasks);
      }
    });
  };

  const filterTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <>
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
    </>
  );
}

export default MainSB;
