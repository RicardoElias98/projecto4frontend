import React from "react";
import "../general.css";

function Task({ title, priority }) {
  let priorityClass = "";

  if (priority === 300) {
    priorityClass = "high-priority";
  } else if (priority === 200) {
    priorityClass = "medium-priority";
  } else if (priority === 100) {
    priorityClass = "low-priority";
  }

  return (
    <div className={`task ${priorityClass}`}>
      {title}
    </div>
  );
}

export default Task;

