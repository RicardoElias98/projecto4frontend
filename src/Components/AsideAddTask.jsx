import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../general.css";
import { userStore } from "../stores/UserStore";
import CategoryModal from "./CategoryModal";
import AllCategoriesModal from "./AllCategoriesModal";
import { categoriesStore } from "../stores/CategoriesStore";

function AsideAddTask() {
  const token = userStore.getState().token;
  const [categories, setCategories] = useState([]);
  const updateCategories = categoriesStore((state) => state.updateCategories);
  const fullUsers = userStore.getState().allUsers;
  const updateSelectedCategory = categoriesStore(
    (state) => state.updateSelectedCategory
  );
  const updateUserSelected = userStore((state) => state.updateUserSelected);

  useEffect(() => {
    getAllCategories();
  }, [categories]);
  const priorityMapping = {
    Low: 100,
    Medium: 200,
    High: 300,
  };

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAllCategoriesModalOpen, setIsAllCategoriesModalOpen] =
    useState(false);

  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleOpenAllCategoriesModal = () => {
    setIsAllCategoriesModalOpen(true);
  };

  const handleCloseAllCategoriesModal = () => {
    setIsAllCategoriesModalOpen(false);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    fetch("http://localhost:8080/project4backend/rest/task/allCategories", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
    }).then(async function (response) {
      if (response.status === 401) {
        alert("Unauthorized");
      } else if (response.status === 200) {
        const categoriesData = await response.json();
        setCategories(categoriesData);
        updateCategories(categoriesData);
      }
    });
  };

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
    const task = {
      title: formData.taskName,
      description: formData.taskDescription,
      priority: priorityMapping[formData.priority] || "Unknow",
      startDate: formData.startDate,
      endDate: formData.endDate,
      category: formData.category,
    };
    console.log("PRIORITY:" + task.priority);
    event.preventDefault();
    fetch("http://localhost:8080/project4backend/rest/task/add", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(task),
    }).then(async function (response) {
      if (response.status === 401) {
        alert("Unauthorized");
      } else if (response.status === 400) {
        alert("All elements are required");
      } else if (response.status === 201) {
        alert("Task created.");
      }
    });
  };

  const handleChangeFilter = (event) => {
    updateSelectedCategory(event.target.value);
  };

  const handleChangeFilterUser = (event) => {
    updateUserSelected(event.target.value);
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
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          defaultValue=""
          name="priority"
          onChange={handleChange}
        >
          <option value="">Choose a Priority...</option>
          <option value="Low">Low &#x1F7E2;</option>
          <option value="Medium">Medium &#x1F7E1; </option>
          <option value="High">High &#x1F534; </option>
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
      <button className="button" onClick={handleOpenCategoryModal}>
        Add Category
      </button>
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={handleCloseCategoryModal}
      />
      <button className="button" onClick={handleOpenAllCategoriesModal}>
        Edit/Delete Categories
      </button>
      <AllCategoriesModal
        isOpen={isAllCategoriesModalOpen}
        onClose={handleCloseAllCategoriesModal}
        categories={categories}
      />
      <label htmlFor="category">Filter by Category:</label>
      <select
        id="categoryFilter"
        defaultValue=""
        name="categoryFilter"
        onChange={handleChangeFilter}
      >
        <option value="">Choose a category...</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <label htmlFor="category">Filter by User:</label>
      <select id="userFilter" defaultValue="" name="userFilter" onChange={handleChangeFilterUser}>
        <option value="">Choose an user...</option>
        {fullUsers.map((user) => (
          <option key={user.id} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AsideAddTask;
