import React from "react";
import { ProductFormStyles } from "../../Styles/ProductFormStyles";

const ImagesForm = ({
  basicFormInput,
  formInputHandler,
  formSubmitHandler,
  inputErrorMessage,
  setImagesFormInput,
}) => {
  return (
    <ProductFormStyles>
      <form>
        <h3>Add Images</h3>
        {inputErrorMessage !== null && (
          <div className="error">
            <span>{inputErrorMessage}</span>
          </div>
        )}
        <div>
          <label>Upload Main Image :</label>
          <input
            name="mainImage"
            type="file"
            // value={basicFormInput.mainImage}
            onChange={(e) =>
              formInputHandler(
                "mainImage",
                e,
                basicFormInput,
                setImagesFormInput
              )
            }
          />
        </div>
        <div>
          <label>Add Swatches(optional) :</label>
          <input
            name="swatches"
            type="file"
            multiple
            // value={basicFormInput.swatches}
            onChange={(e) =>
              formInputHandler(
                "swatches",
                e,
                basicFormInput,
                setImagesFormInput
              )
            }
          />
        </div>
        <div>
          <div
            className="button"
            onClick={(e) => formSubmitHandler(e, "productImgs", basicFormInput)}
          >
            Save
          </div>
        </div>
      </form>
    </ProductFormStyles>
  );
};

export default ImagesForm;
