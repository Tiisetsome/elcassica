import React from "react";
import { ProductFormStyles } from "../../Styles/ProductFormStyles";

const InventoryForm = ({
  basicFormInput,
  formInputHandler,
  formSubmitHandler,
  inputErrorMessage,
  setInventoryFormInput,
}) => {
  return (
    <ProductFormStyles>
      <form>
        <h3>Inventory</h3>
        {inputErrorMessage !== null && (
          <div className="error">
            <span>{inputErrorMessage}</span>
          </div>
        )}
        <div>
          <label>Stock Keeping Unit :</label>
          <input
            name="stockKeepingUnit"
            type="text"
            value={basicFormInput.stockKeepingUnit}
            onChange={(e) =>
              formInputHandler(
                "stockKeepingUnit",
                e,
                basicFormInput,
                setInventoryFormInput
              )
            }
          />
        </div>
        <div>
          <label>Product Barcode(optional) :</label>
          <input
            name="productBarcode"
            type="text"
            value={basicFormInput.productBarcode}
            onChange={(e) =>
              formInputHandler(
                "productBarcode",
                e,
                basicFormInput,
                setInventoryFormInput
              )
            }
          />
        </div>
        <div>
          <label>Stock Quantity :</label>
          <input
            name="stockQuantity"
            type="text"
            value={basicFormInput.stockQuantity}
            onChange={(e) =>
              formInputHandler(
                "stockQuantity",
                e,
                basicFormInput,
                setInventoryFormInput
              )
            }
          />
        </div>
        <div>
          <label>Manage Stock :</label>
          <select
            name="manageStock"
            onChange={(e) =>
              formInputHandler(
                "manageStock",
                e,
                basicFormInput,
                setInventoryFormInput
              )
            }
          >
            <option value={true}>Track Inventory</option>
            <option value={false}>Don't Track Inventory</option>
          </select>
        </div>
        <div>
          <div
            className="button"
            onClick={(e) => formSubmitHandler(e, "inventory", basicFormInput)}
          >
            Save
          </div>
        </div>
      </form>
    </ProductFormStyles>
  );
};

export default InventoryForm;
