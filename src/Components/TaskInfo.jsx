import React from "react";
import "../general.css";
import { categoriesStore } from "../stores/CategoriesStore";

function TaskInfo({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }
  const handleClose = () => {
    onClose();
  };

  const categories = categoriesStore.getState().categories;


  return (
    <div className="modal" id="taskInfoModal">
      <div className="modal-content">
        <h2 className="h2">Task Info</h2>

        <label className="h2" htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          id="taskName"
          name="taskName"
          defaultValue=""
          
        />
        <label className="h2" htmlFor="taskDescription">Task Description:</label>
        <input
          type="text"
          id="taskDescription"
          name="taskDescription"
          defaultValue=""
          
        />
        <label className="h2" htmlFor="category">Category:</label>
        <select
          id="category"
          defaultValue=""
          name="category"
          
        >
          <option value="">Choose a category...</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <label className="h2" htmlFor="priority">Priority:</label>
        <select
          id="priority"
          defaultValue=""
          name="priority"
          
        >
          <option value="">Choose a Priority...</option>
          <option value="Low">Low &#x1F7E2;</option>
          <option value="Medium">Medium &#x1F7E1; </option>
          <option value="High">High &#x1F534; </option>
        </select>
        <label className="h2" htmlFor="startDate">Initial Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          defaultValue=""
          
        />
        <label className="h2" htmlFor="endDate">Final Date:</label>
        <input
          type="date"
          id="endDate"
          defaultValue=""
          name="endDate"
          
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
