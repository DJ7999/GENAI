import { useState } from "react";
import Autocomplete from "../Autocomplete/AutoComplete";
import "./AddStock.css";
export const AddInvestment = ({ closeModal, onSubmit, defaultValue ,stockList}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      equity: 0,
      purchase_price: "",
      shares: "",
      investment_date:"",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.equity && formState.purchase_price&& formState.shares && formState.investment_date) {
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
  };

  const handleSelect = (selectedItem) => {
    formState["equity"]=selectedItem.id;
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
            <label className="lg-value lable-title">Stock Name</label>
            <Autocomplete suggestions={stockList} onSelect={handleSelect}/>
            <label className="lg-value lable-title">Avg. Price</label>
            <input
              name="purchase_price"
              onChange={handleChange}
              type="number"
              step="any"
              min="0.1"
              value={formState.purchase_price}
            />
            <label className="lg-value lable-title">Qty</label>
            <input
              name="shares"
              onChange={handleChange}
              type="number"
              min="1"
              value={formState.shares}
            />
            <label className="lg-value lable-title">Investment date</label>
            <input
              name="investment_date"
              onChange={handleChange}
              type="date"
              value={formState.investment_date}
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
