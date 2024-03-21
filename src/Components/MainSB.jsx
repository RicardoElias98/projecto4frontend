import React, { useState, useEffect } from "react";
import "../general.css";
import { userStore } from "../stores/UserStore";
import Task from "./Task";
import { tasksStore } from "../stores/TasksStore";
import { categoriesStore } from "../stores/CategoriesStore";

function MainSB() {
  const token = userStore.getState().token;
  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const selectedCategory = categoriesStore((state) => state.selectedCategory);
  const selectedUser = userStore((state) => state.selectedUser);
  

  const updateTask = tasksStore((state) => state.updateTasks);
  const tasks = tasksStore.getState().tasks;

  useEffect(() => {
    displayTasksByStatus(10, setTodoTasks);
    displayTasksByStatus(20, setDoingTasks);
    displayTasksByStatus(30, setDoneTasks);
  }, []);

  useEffect(() => {
    const combinedTasks = [...todoTasks, ...doingTasks, ...doneTasks];
    setAllTasks(combinedTasks);
    console.log(combinedTasks);
    updateTask(combinedTasks);
  }, [todoTasks, doingTasks, doneTasks]);

  const displayTasksByStatus = (status, setTasks) => {
    fetch(`http://localhost:8080/project4backend/rest/task/status`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
        status: status,
      },
    })
      .then(async function (response) {
        if (response.status === 401) {
          alert("Unauthorized");
        } else if (response.status === 200) {
          const tasksData = await response.json();
          setTasks(tasksData);
          console.log("entrei");
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData("data_id", taskId);
  };

  const handleDrop = (event, status) => {
    const taskId = event.dataTransfer.getData("data_id");

    updateStatus(status, taskId);

    displayTasksByStatus(10, setTodoTasks);
    displayTasksByStatus(20, setDoingTasks);
    displayTasksByStatus(30, setDoneTasks);
  };

  const updateStatus = (newStatus, idTask) => {
    console.log("newStatus: " + newStatus);
    console.log("idTask: " + idTask);
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
    )
      .then(async function (response) {
        if (response.status === 401) {
          console.log("Unauthorized");
        } else if (response.status === 400) {
          console.log("Failed. Status not changed");
        } else if (response.status === 200) {
          console.log("status changed to" + newStatus);
        }
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
      });
  };

  return (
    <div className="board">
      <div className="total-column">
        <div className="column-header" id="to-do-header">
          <h2>To Do</h2>
        </div>
        <div
          className="board-container"
          id="todo-container"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, 10)}
        >
          <section className="board-column" id="todo-column">
            {todoTasks
              .filter((task) => task.active === true && (!selectedCategory || task.category === selectedCategory)  &&
              (!selectedUser || task.user === selectedUser))
              .map((task) => (
                <Task
                  key={task.id}
                  title={task.title}
                  priority={task.priority}
                  id={task.id}
                  description={task.description}
                  category={task.category}
                  startDate={task.startDate}
                  endDate={task.endDate}
                  status={task.status}
                  onDragStart={(event) => handleDragStart(event, task.id)}
                />
              ))}
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="doing-header">
          <h2>Doing</h2>
        </div>
        <div
          className="board-container"
          id="doing-container"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, 20)}
        >
          <section className="board-column" id="doing-column">
            {doingTasks
              .filter((task) => task.active === true && (!selectedCategory || task.category === selectedCategory)  &&
              (!selectedUser || task.user === selectedUser))
              .map((task) => (
                <Task
                  key={task.id}
                  title={task.title}
                  priority={task.priority}
                  id={task.id}
                  description={task.description}
                  category={task.category}
                  startDate={task.startDate}
                  endDate={task.endDate}
                  status={task.status}
                  onDragStart={(event) => handleDragStart(event, task.id)}
                />
              ))}
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="done-header">
          <h2>Done</h2>
        </div>
        <div
          className="board-container"
          id="done-container"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, 30)}
        >
          <section className="board-column" id="done-column">
            {doneTasks
              .filter((task) => task.active === true && (!selectedCategory || task.category === selectedCategory)  &&
              (!selectedUser || task.user === selectedUser))
              .map((task) => (
                <Task
                  key={task.id}
                  title={task.title}
                  priority={task.priority}
                  id={task.id}
                  description={task.description}
                  category={task.category}
                  startDate={task.startDate}
                  endDate={task.endDate}
                  status={task.status}
                  onDragStart={(event) => handleDragStart(event, task.id)}
                />
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainSB;
