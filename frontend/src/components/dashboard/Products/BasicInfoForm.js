import React from "react";
import { KIDSHOP, MENSHOP, WOMENSHOP } from "../../../HOC/constants/constants";
import { ProductFormStyles } from "../../Styles/ProductFormStyles";

const BasicInfoForm = ({
  basicFormInput,
  formInputHandler,
  formSubmitHandler,
  inputErrorMessage,
  setBasicForm,
}) => {
  let categories;
  if (basicFormInput.shop === MENSHOP.shop) {
    categories = Object.values(MENSHOP.categories);
  } else if (basicFormInput.shop === WOMENSHOP.shop) {
    categories = Object.values(WOMENSHOP.categories);
  } else {
    categories = ["All"];
  }
  return (
    <ProductFormStyles>
      <form>
        <h3>Add New Product</h3>
        {inputErrorMessage !== null && (
          <div className="error">
            <span>Please fill in all fields</span>
          </div>
        )}
        <div>
          <label>Brand :</label>
          <input
            name="brand"
            type="text"
            value={basicFormInput.brand}
            onChange={(e) =>
              formInputHandler("brand", e, basicFormInput, setBasicForm)
            }
          />
        </div>
        <div>
          <label>Type :</label>
          <input
            name="type"
            type="text"
            value={basicFormInput.type}
            onChange={(e) =>
              formInputHandler("type", e, basicFormInput, setBasicForm)
            }
          />
        </div>
        <div>
          <label>Shop :</label>
          <select
            name="shop"
            onChange={(e) =>
              formInputHandler("shop", e, basicFormInput, setBasicForm)
            }
          >
            <option value={MENSHOP.shop}>Men</option>
            <option value={WOMENSHOP.shop}>Women</option>
            <option value={KIDSHOP.shop}>Kids</option>
          </select>
        </div>
        <div>
          <label>Category :</label>
          <select
            name="category"
            onChange={(e) =>
              formInputHandler("category", e, basicFormInput, setBasicForm)
            }
          >
            {categories.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Description :</label>
          <textarea
            name="description"
            value={basicFormInput.description}
            onChange={(e) =>
              formInputHandler("description", e, basicFormInput, setBasicForm)
            }
          ></textarea>
        </div>
        <div>
          <button
            onClick={(e) => formSubmitHandler(e, "basicInfo", basicFormInput)}
          >
            Save
          </button>
        </div>
      </form>
    </ProductFormStyles>
  );
};

export default BasicInfoForm;
