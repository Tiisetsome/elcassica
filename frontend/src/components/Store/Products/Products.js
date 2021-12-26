import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import ProductStyles from "../../Styles/ProductStyles";
import Header from "../../Header/Header";
import Product from "../Product/Product";
import ProductNew from "../Product/ProductNew";
import ProductNewStyles from "../../Styles/ProductNewStyles";
import { arrLeft, arrRight } from "../../Arrows/Arrows";
import { arrLeftMobile, arrRightMobile } from "../../Arrows/ArrowMobile";

const Products = ({ productCategory, header }) => {
  const [newProducts, setNewProducts] = useState([]);
  const [newProductsToShow, setNewProductsToShow] = useState([]);
  const [noOfProductsToShow, setNoOfProductsToShow] = useState(4);

  const getNewProducts = () => {
    const newProducts = productCategory.filter(
      (product) => product.new === true
    );
    setNewProducts(newProducts);
  };

  const updateLikeProducts = (operator) => {
    const numberOfItems = newProducts.length;
    if (operator === "+" && noOfProductsToShow < numberOfItems) {
      setNoOfProductsToShow(noOfProductsToShow + 4);
    } else if (operator === "-" && noOfProductsToShow > 4) {
      setNoOfProductsToShow(noOfProductsToShow - 4);
    }
  };

  useEffect(() => {
    if (productCategory !== null) {
      getNewProducts();
    }
  }, [productCategory]);

  useEffect(() => {
    setNewProductsToShow(
      newProducts.slice(noOfProductsToShow - 4, noOfProductsToShow)
    );
  }, [newProducts, noOfProductsToShow]);

  return (
    <ProductStyles>
      <Header heading={header} />
      <div className="products-container">
        <div className="products-wrapper">
          {productCategory !== null
            ? productCategory.map((productItem) => {
                return <Product key={productItem._id} item={productItem} />;
              })
            : null}
        </div>
      </div>
      {newProducts.length > 0 && (
        <ProductNewStyles>
          <h2>New arrivals in stock</h2>
          <div className="new_stock">
            {newProducts.length > 4 && (
              <ArrowBackIosIcon
                style={window.innerWidth <= 500 ? arrLeftMobile : arrLeft}
                onClick={() => updateLikeProducts("-")}
              />
            )}
            <div className="stock-container">
              {newProductsToShow.map((product) => {
                return <ProductNew key={product._id} product={product} />;
              })}
            </div>
            {newProducts.length > 4 && (
              <ArrowForwardIosIcon
                style={window.innerWidth <= 500 ? arrRightMobile : arrRight}
                onClick={() => updateLikeProducts("+")}
              />
            )}
          </div>
        </ProductNewStyles>
      )}
    </ProductStyles>
  );
};

export default Products;
