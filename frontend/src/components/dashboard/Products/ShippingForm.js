import React from "react";
import { ProductFormStyles } from "../../Styles/ProductFormStyles";

const ShippingForm = ({
  basicFormInput,
  formInputHandler,
  formSubmitHandler,
  inputErrorMessage,
  setShippingFormInput,
}) => {
  return (
    <ProductFormStyles>
      <form>
        <h3>Shipping</h3>
        {inputErrorMessage !== null && (
          <div className="error">
            <span>{inputErrorMessage}</span>
          </div>
        )}
        <div>
          <label>Product Weight :</label>
          <input
            name="productWeight"
            type="text"
            value={basicFormInput.productWeight}
            onChange={(e) =>
              formInputHandler(
                "productWeight",
                e,
                basicFormInput,
                setShippingFormInput
              )
            }
          />
        </div>
        <div>
          <label>Weight Unit :</label>
          <input
            name="weightUnit"
            type="text"
            value={basicFormInput.weightUnit}
            onChange={(e) =>
              formInputHandler(
                "weightUnit",
                e,
                basicFormInput,
                setShippingFormInput
              )
            }
          />
        </div>
        <div>
          <div
            className="button"
            onClick={(e) => formSubmitHandler(e, "shipping", basicFormInput)}
          >
            Save
          </div>
        </div>
      </form>
    </ProductFormStyles>
  );
};

export default ShippingForm;
