import React from "react";
import styled from "styled-components";

const ProductDisplay = ({
  formData,
  mainImageDisplay,
  productImages,
  currentTab,
  createProductHandler,
  productUpdate,
  updateProductHandler,
}) => {
  const swatchImagesAdded = productImages.length > 0 ? true : false;

  return (
    <ProductDisplayStyles>
      <div className="product-images-wrapper">
        <div className="main-img">
          {mainImageDisplay ? (
            <img src={mainImageDisplay.filePath} />
          ) : (
            productUpdate && <img src={productUpdate.imageUrl} />
          )}
        </div>
        <div className="nav-imgs">
          {swatchImagesAdded &&
            productImages.map((swatchImage, index) => {
              return (
                <div key={index}>
                  <img src={swatchImage.filePath} />
                </div>
              );
            })}
        </div>
      </div>
      <div className="details">
        <div style={{ gridColumn: "1 / span 2" }}>
          <span>{`${formData.brand} ${formData.type}`}</span>
        </div>
        <div>
          <span>Sizes : </span>
          <span>
            {formData.sizes.map((size) => size.toUpperCase()).join(" | ")}
          </span>
        </div>
        <div>
          <span>Colors : </span>
          <span>
            {formData.colors.map((color) => color.toUpperCase()).join(" | ")}
          </span>
        </div>
        <div>
          <span>Quantity : </span>
          <span>{formData.quantity}</span>
        </div>
        <div>
          <span>Price : </span>
          <span>R {formData.mainPrice}</span>
        </div>
        <div
          className="description-wrapper"
          style={{ gridColumn: "1 / span 2" }}
        >
          <span>Description : </span>
          <p>{formData.description}</p>
        </div>
        {currentTab === "tab-7" && (
          <div
            className="button"
            onClick={
              productUpdate ? updateProductHandler : createProductHandler
            }
          >
            {productUpdate ? "Update Product" : "Create Product"}
          </div>
        )}
      </div>
    </ProductDisplayStyles>
  );
};

const ProductDisplayStyles = styled.div`
  width: 100%;
  margin-bottom: 2rem;

  .product-images-wrapper {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;

    .main-img {
      width: 16rem;
      height: 16rem;
      background-color: var(--light-grey-extra);
      overflow: hidden;

      img {
        max-width: 16rem;
        height: 16rem;
        object-fit: contain;
      }
    }

    .nav-imgs {
      div {
        width: 3.25rem;
        height: 3.25rem;
        background-color: var(--light-grey-extra);
        margin-bottom: 1rem;

        img {
          width: 3.25rem;
          height: 3.25rem;
          object-fit: contain;
        }
      }

      div:last-child {
        margin-bottom: 0rem;
      }
    }
  }

  .details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;

    div {
      margin-bottom: 1rem;

      span:first-child {
        margin-right: 1rem;
        font-family: Montserrat-Semibold;
      }
    }

    .description-wrapper {
      p {
        margin-top: 1rem;
        width: 100%;
        line-height: 1.5rem;
      }
    }

    .button {
      padding: 0.5rem 1rem;
      margin-bottom: 1rem;
      outline: none;
      border: none;
      color: #fff;
      background-color: var(--light-blue-color);
      text-align: center;
    }
  }
`;

export default ProductDisplay;
