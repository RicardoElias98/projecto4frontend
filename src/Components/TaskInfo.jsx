import React from "react";

function TaskInfo() {
  return (
    <div>
      <div id="editTaskModal" class="modal">
        <h1>Edit Task</h1>
        <div class="input-container">
          <label for="editTaskTitle">Title:</label>
          <textarea
            type="text"
            id="editarTarefaTitulo"
            name="title"
            required
          ></textarea>
          <label for="editTaskDescription">Description:</label>
          <textarea
            type="text"
            id="editarTarefaDescricao"
            name="description"
            required
          ></textarea>
        </div>
        <div class="center-container">
          <label for="editTaskStatus">Status:</label>
          <select id="editTaskStatus" name="status">
            <option value="ToDo">To Do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>

          <label for="editTaskPriority">Priority:</label>
          <select id="editTaskPriority" name="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="date-container">
          <label for="initialDate">Initial Date:</label>
          <input type="date" id="initialDateEdit" name="initialDate" required />
          <label for="finalDate">Final Date:</label>
          <input type="date" id="finalDateEdit" name="finalDate" required />
          <p id="dateError" style="color: red; display: none">
            Final Date should not be before Initial Date.
          </p>
        </div>

        <div class="modal-footer">
          <button type="button" id="CancelaEditarTarefa">
            Cancel
          </button>
          <button type="button" id="GuardaEditarTarefa">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskInfo;
