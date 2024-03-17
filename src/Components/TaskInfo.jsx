import React from "react";
import "../general.css";
import { categoriesStore } from "../stores/CategoriesStore";
import { useState } from "react";
import { userStore } from "../stores/UserStore";

function TaskInfo({
  isOpen,
  onClose,
  taskName,
  taskDescription,
  priority,
  category,
  startDate,
  endDate,
  taskId
}) {
  const token = userStore.getState().token;
  const categories = categoriesStore.getState().categories;

  const priorityMapping = {
    Low: 100,
    Medium: 200,
    High: 300,
  };

  const priorityValue = priorityMapping[priority];

  const [formData, setFormData] = useState({
    title: taskName,
    description: taskDescription,
    category: category,
    startDate: startDate,
    endDate: endDate,
    priority: priority,
    id: taskId,
  });

  const handleConfirm = () => {
    console.log(formData);
    formData.priority = priorityMapping[formData.priority];
    console.log(formData);
    fetch("http://localhost:8080/project4backend/rest/task/update", {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(formData),
    }).then(function (response) {
      if (response.status === 401) {
        console.log("Unauthorized");
      } else if (response.status === 406) {
        console.log("Failed. Task not updated. All elements are required");
      } else if (response.status === 400) {
        console.log("Failed. Task not updated");
      } else if (response.status === 200) {
        console.log("Task updated");
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (!isOpen) {
    return null;
  }
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal" id="taskInfoModal">
      <div className="modal-content">
        <h2 className="h2">Task Info</h2>

        <label className="h2" htmlFor="taskName">
          Task Name:
        </label>
        <input
          type="text"
          id="taskName"
          name="title"
          defaultValue={taskName}
          onChange={handleChange}
        />
        <label className="h2" htmlFor="taskDescription">
          Task Description:
        </label>
        <input
          type="text"
          id="taskDescription"
          name=" description"
          defaultValue={taskDescription}
          onChange={handleChange}
        />
        <label className="h2" htmlFor="category">
          Category:
        </label>
        <select
          id="category"
          defaultValue={category}
          name="category"
          onChange={handleChange}
        >
          <option value="">Choose a category...</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <label className="h2" htmlFor="priority">
          Priority:
        </label>
        <select
          id="priority"
          value={priorityValue}
          name="priority"
          onChange={handleChange}
        >
          <option value="">Choose a Priority...</option>
          <option value="Low">Low &#x1F7E2;</option>
          <option value="Medium">Medium &#x1F7E1; </option>
          <option value="High">High &#x1F534; </option>
        </select>
        <label className="h2" htmlFor="startDate">
          Initial Date:
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          defaultValue={startDate}
          onChange={handleChange}
        />
        <label className="h2" htmlFor="endDate">
          Final Date:
        </label>
        <input
          type="date"
          id="endDate"
          defaultValue={endDate}
          name="endDate"
          onChange={handleChange}
        />
        <button className="button"> Edit </button>
        <button className="button" onClick={handleConfirm}>
          {" "}
          Confirm{" "}
        </button>
        <button className="button"> Delete </button>
        <button className="button" onClick={handleClose}>
          {" "}
          Cancel{" "}
        </button>
      </div>
    </div>
  );
}

export default TaskInfo;
