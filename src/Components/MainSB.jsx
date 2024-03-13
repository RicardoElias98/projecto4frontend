import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../general.css";
import { userStore } from "../stores/UserStore";
import TaskInfo from "./TaskInfo";
import Task from "./Task";

function MainSB() {
  const token = userStore.getState().token;
  const [counter, setCounter] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const statusMapping = {
    todo: 10,
    doing: 20,
    done: 30,
  };

  const updateStatus = (newStatus, idTask) => {
    console.log(token);
    fetch(
      `http://localhost:8080/project4backend/rest/task/changeStatus/${idTask}`,
      {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    ).then(async function (response) {
      if (response.status === 401) {
        console.log("Unauthorized");
      } else if (response.status === 400) {
        console.log("Failed. Status not changed");
      } else if (response.status === 200) {
        console.log("status changed to" + newStatus);
      }
    });
  };

  useEffect(() => {
    displayTasksTodo();
    displayTasksDoing();
    displayTasksDone();
  }, [counter]);

  const displayTasksTodo = () => {
    fetch("http://localhost:8080/project4backend/rest/task/status", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
        status: 10,
      },
    }).then(async function (response) {
      if (response.status === 401) {
        alert("Unauthorized");
      } else if (response.status === 200) {
        const tasksData = await response.json();
        //console.log("To Do", JSON.stringify(tasksData));
        setTodoTasks(tasksData);
        // console.log("To Do", todoTasks);
      }
    });
  };

  const displayTasksDoing = () => {
    fetch("http://localhost:8080/project4backend/rest/task/status", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
        status: 20,
      },
    }).then(async function (response) {
      if (response.status === 401) {
        alert("Unauthorized");
      } else if (response.status === 200) {
        const tasksData = await response.json();
        setDoingTasks(tasksData);
        console.log("Doing", doingTasks);
      }
    });
  };

  const displayTasksDone = () => {
    fetch("http://localhost:8080/project4backend/rest/task/status", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
        status: 30,
      },
    }).then(async function (response) {
      if (response.status === 401) {
        alert("Unauthorized");
      } else if (response.status === 200) {
        const tasksData = await response.json();
        setDoneTasks(tasksData);
        console.log("Done", doneTasks);
      }
    });
  };

  return (
    <div className="board">
      <div className="total-column">
        <div className="column-header" id="to-do-header">
          <h2>To Do</h2>
        </div>

        <div className="board-container" id="todo-container">
          <section className="board-column" id="todo-column">
            {todoTasks.map((task) => (
              <Task key={task.id} title={task.title} priority={task.priority} />
            ))}
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="doing-header">
          <h2>Doing</h2>
        </div>
        <div className="board-container" id="doing-container">
          <section className="board-column" id="doing-column">
          {doingTasks.map((task) => (
              <Task key={task.id} title={task.title} priority={task.priority} />
            ))}
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="done-header">
          <h2>Done</h2>
        </div>
        <div className="board-container" id="done-container">
          <section className="board-column" id="done-column">
          {doneTasks.map((task) => (
              <Task key={task.id} title={task.title} priority={task.priority}/>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainSB;
