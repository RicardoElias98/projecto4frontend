import React, { useState } from "react";
import "../general.css";
import { categoriesStore } from "../stores/CategoriesStore";
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
  taskId,
  status,
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
    status: status,
  });

  const [isEditable, setIsEditable] = useState(false);

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
        onClose();
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleDelete = () => {
    const id = formData.id;
    fetch(`http://localhost:8080/project4backend/rest/task/block/${id}`, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
    }).then(function (response) {
      if (response.status === 401) {
        console.log("Unauthorized");
      } else if (response.status === 400) {
        console.log("Failed. Task not deleted");
      } else if (response.status === 200) {
        console.log("Task deleted");
        onClose();
      }
    });
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
          value={formData.title}
          onChange={handleChange}
          readOnly={!isEditable}
        />
        <label className="h2" htmlFor="taskDescription">
          Task Description:
        </label>
        <input
          type="text"
          id="taskDescription"
          name="description"
          value={formData.description}
          onChange={handleChange}
          readOnly={!isEditable}
        />
        <label className="h2" htmlFor="category">
          Category:
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={!isEditable}
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
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          disabled={!isEditable}
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
          value={formData.startDate}
          onChange={handleChange}
          readOnly={!isEditable}
        />
        <label className="h2" htmlFor="endDate">
          Final Date:
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          readOnly={!isEditable}
        />
        {isEditable ? (
          <>
            <button className="button" onClick={handleConfirm}>
              {" "}
              Confirm{" "}
            </button>
            <button className="button" onClick={handleClose}>
              {" "}
              Cancel{" "}
            </button>
            <button className="button" onClick={handleDelete}>
              {" "}
              Delete{" "}
            </button>
          </>
        ) : (
          <>
            <button className="button" onClick={handleEditClick}>
              Edit
            </button>
            <button className="button" onClick={handleClose}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskInfo;
