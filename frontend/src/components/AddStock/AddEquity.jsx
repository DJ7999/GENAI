import { useState } from "react";
import "./AddStock.css";
import CurrentPortfolio from "../CurrentPortfolio/InvestmentHistory";
export const AddEquity = ({ closeModal, onSubmit, defaultValue }) => {
  
  const [formState, setFormState] = useState(
    defaultValue || {
      title: "",
      symbol: ""
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.title && formState.symbol) {
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
    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
    <CurrentPortfolio />;
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
            
            <label className="lg-value lable-title">Title</label>
            <input
              name="title"
              onChange={handleChange}
              type="text"
              value={formState.title}
            />
            <label className="lg-value lable-title">Symbol</label>
            <input
              name="symbol"
              onChange={handleChange}
              type="text"
              value={formState.symbol}
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
