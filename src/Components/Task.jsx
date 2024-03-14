import React from "react";
import "../general.css";

function Task({ title, priority, id }) {
  let priorityClass = "";

  if (priority === 300) {
    priorityClass = "high-priority";
  } else if (priority === 200) {
    priorityClass = "medium-priority";
  } else if (priority === 100) {
    priorityClass = "low-priority";
  }

  const handleDragStart = (event) => {
    event.dataTransfer.setData("data_id", id);
  };

  return (
    <div
      className={`task ${priorityClass}`}
      draggable="true"
      onDragStart={handleDragStart}
    >
      {title}
    </div>
  );
}

export default Task;
