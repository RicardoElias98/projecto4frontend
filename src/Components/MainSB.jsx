import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../general.css";
import { userStore } from "../stores/UserStore";
import TaskInfo from "./TaskInfo";

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

  useEffect(() => {             
    const handleDragStart = (event, taskId) => {
      event.dataTransfer.setData("taskId", taskId);
    };

    const handleDragOver = (event) => {
      event.preventDefault();
      
    };

    const handleDrop = (event, status) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData("taskId");
      updateStatus(statusMapping[status], taskId);
      setCounter(counter + 1);
      
    };

    /* TO-DO */
    const todoColumn = document.getElementById("todo-column");
    todoColumn.innerHTML = "";
    todoTasks.forEach((task) => {
      const taskElement = document.createElement("div");

      taskElement.setAttribute("id", task.id);
      taskElement.setAttribute("draggable", "true");

      taskElement.classList.add("task");

      taskElement.style.margin = "5px 10px";

      if (task.priority == 100) {
        taskElement.style.backgroundColor = "#5cbf8a"; // Dark green
      } else if (task.priority == 200) {
        taskElement.style.backgroundColor = "#d4d17a"; // Darker yellow
      } else if (task.priority == 300) {
        taskElement.style.backgroundColor = "#f58a8a"; // Dark red
      }
      taskElement.style.textAlign = "center";
      taskElement.textContent = task.title;

      taskElement.addEventListener("dragstart", (event) =>
        handleDragStart(event, task.id)
      );
      taskElement.addEventListener("dragover", handleDragOver);
      taskElement.addEventListener("dblclick", () => {
       //OPEN MODAL DO TASKINFO
      });

      document.getElementById("todo-column").appendChild(taskElement);
    });

    /* DOING */
    const doingColumn = document.getElementById("doing-column");
    doingColumn.innerHTML = "";
    doingTasks.forEach((task) => {
      const taskElement = document.createElement("div");

      taskElement.setAttribute("id", task.id);
      taskElement.setAttribute("draggable", "true");

      taskElement.classList.add("task");

      taskElement.style.margin = "5px 10px";

      if (task.priority == 100) {
        taskElement.style.backgroundColor = "#5cbf8a"; // Dark green
      } else if (task.priority == 200) {
        taskElement.style.backgroundColor = "#d4d17a"; // Darker yellow
      } else if (task.priority == 300) {
        taskElement.style.backgroundColor = "#f58a8a"; // Dark red
      }
      taskElement.style.textAlign = "center";
      taskElement.textContent = task.title;

      taskElement.addEventListener("dragstart", (event) =>
        handleDragStart(event, task.id)
      );
      taskElement.addEventListener("dragover", handleDragOver);
      taskElement.addEventListener("click", () => {
        console.log("Status da tarefa:", task.status);
      });

      document.getElementById("doing-column").appendChild(taskElement);
    });

    /* DONE */
    const doneColumn = document.getElementById("done-column");
    doneColumn.innerHTML = "";
    doneTasks.forEach((task) => {
      const taskElement = document.createElement("div");

      taskElement.setAttribute("id", task.id);
      taskElement.setAttribute("draggable", "true");

      taskElement.classList.add("task");

      taskElement.style.margin = "5px 10px";

      if (task.priority == 100) {
        taskElement.style.backgroundColor = "#5cbf8a"; // Dark green
      } else if (task.priority == 200) {
        taskElement.style.backgroundColor = "#d4d17a"; // Darker yellow
      } else if (task.priority == 300) {
        taskElement.style.backgroundColor = "#f58a8a"; // Dark red
      }
      taskElement.style.textAlign = "center";
      taskElement.textContent = task.title;

      taskElement.addEventListener("dragstart", (event) =>
        handleDragStart(event, task.id)
      );
      taskElement.addEventListener("dragover", handleDragOver);
      taskElement.addEventListener("click", () => {
        console.log("Status da tarefa:", task.status);
      });

      document.getElementById("done-column").appendChild(taskElement);
    });

    const columns = document.querySelectorAll(".board-container");
    columns.forEach((column) => {
      column.addEventListener("dragover", handleDragOver);
      column.addEventListener("drop", (event) =>
        handleDrop(event, column.id.split("-")[0])
      );
    });
  }, [todoTasks, doingTasks, doneTasks]);

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
        setTodoTasks(tasksData);
        console.log("To Do", todoTasks);
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
    </div>
  );
}

export default MainSB;
