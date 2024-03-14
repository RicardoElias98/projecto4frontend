import React from "react";
import "../general.css";
import { Draggable } from "react-beautiful-dnd";

function Task({ title, priority, id, index }) {
  let priorityClass = "";

  if (priority === 300) {
    priorityClass = "high-priority";
  } else if (priority === 200) {
    priorityClass = "medium-priority";
  } else if (priority === 100) {
    priorityClass = "low-priority";
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`task ${priorityClass}`}
        >
          {title}
        </div>
      )}
    </Draggable>
  );
}

export default Task;
