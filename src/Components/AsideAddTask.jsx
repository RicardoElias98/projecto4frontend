import React from "react";
import { useState } from "react";
import "../general.css";

function AsideAddTask() {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          id="taskName"
          name="taskName"
          defaultValue=""
          onChange={handleChange}
        />
        <label htmlFor="taskDescription">Task Description:</label>
        <input
          type="text"
          id="taskDescription"
          name="taskDescription"
          defaultValue=""
          onChange={handleChange}
        />
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          defaultValue=""
          name="category"
          onChange={handleChange}
        >
          <option value="">Choose a category...</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
        </select>
        <label htmlFor="startDate">Initial Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          defaultValue=""
          onChange={handleChange}
        />
        <label htmlFor="endDate">Final Date:</label>
        <input
          type="date"
          id="endDate"
          defaultValue=""
          name="endDate"
          onChange={handleChange}
        />

        <button className="button" type="submit">
          {" "}
          Add task
        </button>
      </form>
    </div>
  );
}

export default AsideAddTask;
