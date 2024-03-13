import { useState } from "react";

import "./EditStock.css";
import { Alert } from "@mui/material";

export const EditGoal = ({ closeModal, onToggle, defaultValue }) => {
   
    const [formState, setFormState] = useState({
        name: defaultValue.name,
        is_active: defaultValue.is_active,
      });
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    
      return true;
    
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onToggle(formState);

    closeModal();
  };
  const handleToggle = (e) => {
   
    setFormState({ ...formState, [e.target.name]: e.target.checked });
  };


  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <p className="lg-value">{formState.stock}</p>
            <label className="lg-value lable-title">Goal Name</label>
            <input
              name="name"
              onChange={handleChange}
              type="text"
              disabled={true}
              value={formState.name}
            />
            <span><label className="lg-value lable-title">Active</label>
            {/* <input
              name="qty"
              onChange={handleChange}
              type="number"
              min="1"
              value={formState.qty}
            /> */}

            <input
        type="checkbox"
        name="is_active"
        checked={formState.is_active}
        onChange={handleToggle}
      /></span>
          </div>

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <div className="button-holder">
            <button
              className="button-1"
              role="button"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
