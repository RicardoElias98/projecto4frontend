import React, { useState } from "react";
import "../general.css";

function CategoryModal({ isOpen, onClose, onConfirm }) {
  const [categoryName, setCategoryName] = useState("");

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleConfirm = () => {
    onConfirm(categoryName);
    setCategoryName("");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="overlay">
          <div className="modal">
            <h2 className="h2">Add Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={handleChange}
            />
            <div className="modal-buttons">
              <button className="button" onClick={handleConfirm}>
                Confirmar
              </button>
              <button className="button" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryModal;
