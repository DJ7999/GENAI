import { useState } from "react";

import "./EditStock.css";
import { Alert } from "@mui/material";

export const EditUser = ({ closeModal, onToggle, defaultValue }) => {
   
    const [formState, setFormState] = useState({
        id:defaultValue.id,
        is_superuser: defaultValue.is_superuser,
        is_staff: defaultValue.is_staff,
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
            <label className="lg-value lable-title">User Role</label>

         <span><label className="lg-value lable-title">Make Employee</label><input
        type="checkbox"
        name="is_staff"
        checked={formState.is_staff}
        onChange={handleToggle}
      /></span>   
      <span><label className="lg-value lable-title">Make Admin</label><input
        type="checkbox"
        name="is_superuser"
        checked={formState.is_superuser}
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
