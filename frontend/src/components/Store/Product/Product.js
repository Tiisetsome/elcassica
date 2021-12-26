import React from "react";
import { Link } from "react-router-dom";

const Product = ({ item }) => {
  const { _id, imageUrl, brand, price, type, colors } = item;
  return (
    <div className="product" key={_id}>
      <div className="image-container">
        <Link to={`/product/${_id}`}>
          <img src={imageUrl} alt="suit" />
        </Link>
      </div>
      <div className="product-price">
        <h4>{brand}</h4>
        <p>
          R <span>{price}</span>
        </p>
      </div>
      <div className="options">
        <p>{type}</p>
        <ul>
          {colors.map((color, index) => {
            return (
              <li key={index}>
                <span
                  className="color"
                  style={{ backgroundColor: color }}
                ></span>
                <span>{color}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Product;
