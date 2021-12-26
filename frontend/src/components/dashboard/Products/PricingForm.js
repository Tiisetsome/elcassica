import React from "react";
import { ProductFormStyles } from "../../Styles/ProductFormStyles";

const PricingForm = ({
  basicFormInput,
  formInputHandler,
  formSubmitHandler,
  inputErrorMessage,
  setPricesFormInput,
}) => {
  return (
    <ProductFormStyles>
      <form>
        <h3>Pricing</h3>
        {inputErrorMessage !== null && (
          <div className="error">
            <span>{inputErrorMessage}</span>
          </div>
        )}
        <div>
          <label>Price :</label>
          <input
            name="mainPrice"
            type="text"
            value={basicFormInput.mainPrice}
            onChange={(e) =>
              formInputHandler(
                "mainPrice",
                e,
                basicFormInput,
                setPricesFormInput
              )
            }
          />
        </div>
        <div>
          <label>Stock Price :</label>
          <input
            name="stockPrice"
            type="text"
            value={basicFormInput.stockPrice}
            onChange={(e) =>
              formInputHandler(
                "stockPrice",
                e,
                basicFormInput,
                setPricesFormInput
              )
            }
          />
        </div>
        <div>
          <label>Sale(optional) :</label>
          <input
            name="salePrice"
            type="text"
            value={basicFormInput.salePrice}
            onChange={(e) =>
              formInputHandler(
                "salePrice",
                e,
                basicFormInput,
                setPricesFormInput
              )
            }
          />
        </div>
        <div>
          <div
            className="button"
            onClick={(e) => formSubmitHandler(e, "pricing", basicFormInput)}
          >
            Save
          </div>
        </div>
      </form>
    </ProductFormStyles>
  );
};

export default PricingForm;
