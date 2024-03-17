import React from "react";
import "../general.css";
import { categoriesStore } from "../stores/CategoriesStore";
import { useState } from "react";

function TaskInfo({
  isOpen,
  onClose,
  taskName,
  taskDescription,
  priority,
  category,
  startDate,
  endDate,
}) {
  const categories = categoriesStore.getState().categories;

  const priorityMapping = {
    Low: 100,
    Medium: 200,
    High: 300,
  };

  const priorityValue = priorityMapping[priority];

  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
    category: "",
    startDate: "",
    endDate: "",
  });

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
          name="taskName"
          defaultValue={taskName}
          onChange={handleChange}
        />
        <label className="h2" htmlFor="taskDescription">
          Task Description:
        </label>
        <input
          type="text"
          id="taskDescription"
          name="taskDescription"
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
        <button className="button"> Confirm </button>
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
