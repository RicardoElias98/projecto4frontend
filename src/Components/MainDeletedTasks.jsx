import React from "react";
import { tasksStore } from "../stores/TasksStore";
import Task from "./Task";

function MainDeletedTasks() {
  const tasks = tasksStore.getState().tasks;
  const deletedTasks = tasks.filter((task) => task.active === false);

  return (
    <div className="board">
      <div className="total-column">
        <div className="column-header" id="deleted-header">
          <h2>Deleted</h2>
        </div>
        <div
          className="board-container"
          id="deleted-container"
          //onDragOver={(event) => event.preventDefault()}
          //onDrop={(event) => handleDrop(event, "developer")}
        >
          <section className="board-column" id="deleted-column">
            {deletedTasks.map((task) => (
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
                //onDragStart={(event) => handleDragStart(event, task.id)}
              />
            ))}
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="deletePerm-header">
          <h2> Restore </h2>
        </div>
        <div
          className="board-container"
          id="deletePerm-container"
          //onDragOver={(event) => event.preventDefault()}
          //onDrop={(event) => handleDrop(event, "user")}
        >
          <section className="board-column" id="deletePerm-column"></section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="restore-header">
          <h2> PERMANENTLY DELETE </h2>
        </div>
        <div
          className="board-container"
          id="restore-container"
          //onDragOver={(event) => event.preventDefault()}
          //onDrop={(event) => handleDrop(event, "user")}
        >
          <section className="board-column" id="restore-column"></section>
        </div>
      </div>
    </div>
  );
}

export default MainDeletedTasks;
