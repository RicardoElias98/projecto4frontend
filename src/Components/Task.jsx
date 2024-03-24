import React, { useState } from "react";
import "../general.css";
import TaskInfo from "./TaskInfo";
import { userStore } from "../stores/UserStore";

function Task({ title, priority, id, description, category, startDate, endDate, status}) {
  let priorityClass = "";
  const rolE = userStore.getState().loginUser.role;

  if (priority === 300) {
    priorityClass = "high-priority";
  } else if (priority === 200) {
    priorityClass = "medium-priority";
  } else if (priority === 100) {
    priorityClass = "low-priority";
  }
  const [isTaskInfoModalOpen, setTaskInfoModalOpen] = useState(false);

  const handleCloseTaskInfoModal = () => {
    setTaskInfoModalOpen(false);
  };

  const handleOpenCategoryModal = () => {
    setTaskInfoModalOpen(true);
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData("data_id", id);
  };

  return (
    <>
      <div
        className={`task ${priorityClass}`}
        draggable={rolE === "Owner" ? "true" : "false"}
        onDragStart={rolE === "Owner" ? handleDragStart : null}
        onDoubleClick={handleOpenCategoryModal}
      >
        {title}
      </div>
      <TaskInfo
        isOpen={isTaskInfoModalOpen}
        onClose={handleCloseTaskInfoModal}
        taskName={title}
        taskDescription={description}
        priority={priority} 
        category= {category} 
        startDate = {startDate} 
        endDate = {endDate}
        taskId={id}
        status={status}

      />
    </>
  );
}

export default Task;
