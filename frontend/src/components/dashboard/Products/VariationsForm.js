import React, { Fragment } from "react";
import { ProductFormStyles } from "../../Styles/ProductFormStyles";
import styled from "styled-components";

const VariationsForm = ({
  basicFormInput,
  formInputHandler,
  formSubmitHandler,
  inputErrorMessage,
  setVariationFormInput,
  variations,
  productVariationsOnchangeHandler,
}) => {
  return (
    <Fragment>
      <ProductFormStyles>
        <form>
          <h3>Item Variations</h3>
          {inputErrorMessage !== null && (
            <div className="error">
              <span>{inputErrorMessage}</span>
            </div>
          )}
          <div>
            <label>Sizes :</label>
            <div
              className="variations-wrapper flex-2"
              style={
                variations.sizes.length > 0
                  ? { display: "flex" }
                  : { display: "none" }
              }
            >
              {variations.sizes.length > 0 &&
                variations.sizes.map((size, index) => {
                  return <span key={index}>{size}</span>;
                })}
            </div>
            <input
              name="sizeInput"
              type="text"
              value={basicFormInput.sizeInput}
              onChange={(e) =>
                formInputHandler(
                  "sizeInput",
                  e,
                  basicFormInput,
                  setVariationFormInput
                )
              }
            />
          </div>
          <div>
            <label>Colors :</label>
            <div
              className="variations-wrapper flex-2"
              style={
                variations.colors.length > 0
                  ? { display: "flex" }
                  : { display: "none" }
              }
            >
              {variations.colors.length > 0 &&
                variations.colors.map((color, index) => {
                  return <span key={index}>{color}</span>;
                })}
            </div>
            <input
              name="colorInput"
              type="text"
              value={basicFormInput.colorInput}
              onChange={(e) =>
                formInputHandler(
                  "colorInput",
                  e,
                  basicFormInput,
                  setVariationFormInput
                )
              }
            />
          </div>
        </form>
        <VariationStyles>
          <form>
            <h3>Pricing by variations</h3>
            <div className="variation-wrapper">
              <p>Variant</p>
              <p>Price</p>
              <p>SKU</p>
              {variations.sizes.length > 0 &&
                variations.sizes.map((size, index) => {
                  return variations.variationPrices.map((variation) => {
                    if (Object.keys(variation).includes(size)) {
                      return (
                        size.length !== 0 && (
                          <Fragment key={index}>
                            <div className="variant">
                              <div>
                                <span>{size}</span>
                              </div>
                            </div>
                            <div className="variant">
                              <div>
                                <input
                                  type="text"
                                  value={variation[size]}
                                  onChange={(e) => {
                                    productVariationsOnchangeHandler(size, e);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="variant">
                              <div>
                                <input
                                  type="text"
                                  value={variation.sku}
                                  onChange={(e) => {
                                    productVariationsOnchangeHandler("sku", e);
                                  }}
                                />
                              </div>
                            </div>
                          </Fragment>
                        )
                      );
                    }
                  });
                })}
            </div>
            <div>
              <div
                className="button"
                onClick={(e) =>
                  formSubmitHandler(e, "variations", basicFormInput)
                }
              >
                Save
              </div>
            </div>
          </form>
        </VariationStyles>
      </ProductFormStyles>
    </Fragment>
  );
};

const VariationStyles = styled.div`
  grid-column: 2 / span 2;
  background-color: var(--light-grey-extra);
  width: 100%;
  margin-bottom: 2rem;
  margin-top: 2rem;
  position: relative;

  &:before {
    content: "";
    top: -2rem;
    left: 0;
    width: 100%;
    height: 2rem;
    background: #fff;
    position: absolute;
  }

  h3 {
    margin: 4rem 0rem 2rem 0rem;
    padding-top: 2rem;
    text-align: center;
    font-size: 0.85rem;
  }

  .variation-wrapper {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1.5fr;
    margin-bottom: 0rem;
    gap: 1.5rem;

    p {
      font-family: Montserrat-Semibold;
    }

    .variant {
      margin-bottom: 0rem;

      div {
        margin-bottom: 0rem;
      }
    }
  }

  .button {
    margin-top: 2rem;
  }
`;
export default VariationsForm;
