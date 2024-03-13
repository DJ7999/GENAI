import { useState } from "react";
import "./AddStock.css";

export const AddGoal = ({ closeModal, onSubmit}) => {
  const [formState, setFormState] = useState(
     {
        name: null,
        duration_in_months: null,
        monthly_contribution: null,
        goal_amount:null,
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.name 
        && (
            (formState.duration_in_months&& formState.monthly_contribution) 
        || (formState.monthly_contribution&& formState.goal_amount)
        || (formState.duration_in_months && formState.goal_amount)
        )) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
        
        return;
    }
    formState.duration_in_months=formState.duration_in_months?parseInt(formState.duration_in_months, 10):null;
    formState.monthly_contribution=formState.monthly_contribution?parseFloat(formState.monthly_contribution):null;
    formState.goal_amount=formState.goal_amount?parseFloat(formState.goal_amount):null;
    onSubmit(formState);

    closeModal();
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
            <label className="lg-value lable-title">Goal Name</label>
            <input
              name="name"
              onChange={handleChange}
              type="text"
              value={formState.name}
            />
            <label className="lg-value lable-title">Duration In Months</label>
            <input
              name="duration_in_months"
              onChange={handleChange}
              type="number"
              min="1"
              value={formState.duration_in_months}
            />
            <label className="lg-value lable-title">Goal Amount</label>
            <input
              name="goal_amount"
              onChange={handleChange}
              type="number"
              min="0.1"
              value={formState.goal_amount}
            />
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
