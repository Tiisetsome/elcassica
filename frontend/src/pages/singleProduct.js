import React, { useContext, useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { CgDanger } from "react-icons/cg";

import Navigation from "../components/Navigation/Navigation";
import ProductsContext from "../context/products/productsContext";
import ProductNew from "../components/Store/Product/ProductNew";
import Reviews from "../components/Store/Reviews/Reviews";
import ProductNewStyles from "../components/Styles/ProductNewStyles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { arrLeft, arrRight } from "../components/Arrows/Arrows";
import {
  arrLeftMobile,
  arrRightMobile,
} from "../components/Arrows/ArrowMobile";

const SingleProduct = () => {
  const productsContext = useContext(ProductsContext);
  const { products, cartItems, addProductToCart } = productsContext;

  const [productImageDisplay, setProductImageDisplay] = useState(null);
  const [productSize, setProductSize] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [otherProducts, setOtherProducts] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(4);

  const params = useParams();
  const history = useHistory();

  const product = products.find((product) => product._id === params.id);
  const isValidDataType = typeof product === "undefined" ? false : true;

  if (!isValidDataType) {
    history.push("/");
  }

  const getOtherProductsToDisplay = () => {
    const otherProducts = products.filter(
      (eachProduct) =>
        eachProduct.shop === product.shop &&
        eachProduct.cartegory === product.cartegory
    );
    return otherProducts;
  };

  const productImageDisplayHandler = (productUrl) => {
    setProductImageDisplay(productUrl);
  };

  const productQuantityHandler = (operator) => {
    if (operator === "+") {
      setProductQuantity(productQuantity + 1);
    } else if (operator === "-" && productQuantity !== 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  const prepareItem = () => {
    const itemPriceTotal = product.price * productQuantity;
    const itemSize = productSize === null ? product.sizes[0] : productSize;

    return {
      name: product.brand + " " + product.cartegory,
      quantity: productQuantity,
      imageUrl: product.imageUrl,
      price: product.price,
      total: itemPriceTotal,
      size: itemSize,
      color: activeColor,
      product: product._id,
      shop: product.shop,
      category: product.cartegory,
    };
  };

  const resetItemState = () => {
    setProductSize(null);
    setProductQuantity(1);
    setActiveColor(null);
    setErrorMessage(false);
  };

  const addItemToCartHandler = () => {
    const item = prepareItem();
    if (activeColor !== null) {
      addProductToCart(item);
      resetItemState();
      return null;
    }
    setErrorMessage(true);
  };

  const isItemInCart = () => {
    let itemIsInCart = false;
    cartItems.forEach((itemInCart) => {
      if (itemInCart.product === product._id) {
        itemIsInCart = true;
      }
    });
    return itemIsInCart;
  };

  const colorActiveHandler = (color) => {
    setActiveColor(color);
  };

  const updateLikeProducts = (operator) => {
    const numberOfItems = getOtherProductsToDisplay().length;
    if (operator === "+" && itemsToShow < numberOfItems) {
      setItemsToShow(itemsToShow + 4);
    } else if (operator === "-" && itemsToShow > 4) {
      setItemsToShow(itemsToShow - 4);
    }
  };

  useEffect(() => {
    let likeProducts = getOtherProductsToDisplay();
    setOtherProducts(likeProducts.slice(itemsToShow - 4, itemsToShow));
  }, [itemsToShow]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Navigation />
      <SingleProductStyles>
        {isValidDataType && (
          <>
            <section className="product-wrapper">
              <h2>{product.cartegory}</h2>
              <div className="product-details">
                <div className="product-images">
                  <div className="nav-images">
                    {product.imageSwatchesUrl.length > 0 &&
                      product.imageSwatchesUrl.map((imageSwatch, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() =>
                              productImageDisplayHandler(imageSwatch)
                            }
                          >
                            <img src={imageSwatch} />
                          </div>
                        );
                      })}
                  </div>
                  <div className="main-image">
                    <img
                      src={
                        product.imageSwatchesUrl.includes(productImageDisplay)
                          ? productImageDisplay
                          : product.imageUrl
                      }
                    />
                  </div>
                </div>
                <div className="product-data">
                  <h2>{product.brand}</h2>
                  <div className="price">
                    <span>R {product.price}</span>
                    <span>Style : {product.type}</span>
                  </div>
                  <div className="colors">
                    <p>Color</p>
                    <div className="color-wrapper">
                      {product.colors.length > 0 &&
                        product.colors.map((color, index) => {
                          return (
                            <div key={index} className="color">
                              <div
                                className={
                                  activeColor === color ? "active" : null
                                }
                                style={{ backgroundColor: `${color}` }}
                                onClick={() => {
                                  colorActiveHandler(color);
                                }}
                              ></div>
                              <span>{color}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="product-attributes">
                    <div className="attributes-wrapper">
                      <form>
                        <label>Size</label>
                        <select
                          name="size"
                          onChange={(e) => setProductSize(e.target.value)}
                        >
                          {product.sizes.length > 0 &&
                            product.sizes.map((size, index) => {
                              return (
                                <option key={index} value={size}>
                                  {size}
                                </option>
                              );
                            })}
                        </select>
                      </form>
                      <div className="product-controls">
                        <span>Quantity</span>
                        <div className="controls">
                          <div onClick={() => productQuantityHandler("-")}>
                            -
                          </div>
                          <div>{productQuantity}</div>
                          <div onClick={() => productQuantityHandler("+")}>
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                    {isItemInCart() ? (
                      <div className="button">In Cart</div>
                    ) : (
                      <div
                        className="button"
                        onClick={() => addItemToCartHandler()}
                      >
                        Add To Cart
                      </div>
                    )}
                    {errorMessage && (
                      <div className="error">
                        <CgDanger
                          style={{ color: "red", fontSize: "1.5rem" }}
                        />
                        <span>Please choose color!</span>
                      </div>
                    )}
                  </div>
                  <div className="product-description">
                    <span>Description</span>
                    <p>{product.description}</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="other-products">
              <ProductNewStyles>
                <h2>You May Also Like</h2>
                <div className="new_stock">
                  <ArrowBackIosIcon
                    style={window.innerWidth <= 500 ? arrLeftMobile : arrLeft}
                    onClick={() => updateLikeProducts("-")}
                  />
                  <div className="stock-container">
                    {otherProducts.map((product) => {
                      return <ProductNew key={product._id} product={product} />;
                    })}
                  </div>
                  <ArrowForwardIosIcon
                    style={window.innerWidth <= 500 ? arrRightMobile : arrRight}
                    onClick={() => updateLikeProducts("+")}
                  />
                </div>
              </ProductNewStyles>
            </section>
            <Reviews />
          </>
        )}
      </SingleProductStyles>
    </Fragment>
  );
};

const SingleProductStyles = styled.main`
  width: 100%;
  margin: 5rem auto 0rem auto;

  .product-wrapper {
    width: 80%;
    margin: auto;
    margin-bottom: 6rem;

    h2 {
      margin-bottom: 3rem;
      color: var(--primary-grey);
      font-family: BauerBodoniStd-Roman;
    }

    .product-details {
      display: flex;
      gap: 4rem;

      .product-images {
        display: flex;
        gap: 2rem;

        .nav-images div {
          width: 4.5rem;
          height: 4.5rem;
          margin-bottom: 2rem;
          object-fit: contain;
          overflow: hidden;
          cursor: pointer;
          background: var(--tertiary-grey);

          img {
            width: 4.5rem;
          }
        }

        .main-image {
          width: 25rem;
          height: 30.5rem;
          background-image: linear-gradient(#aaaaaa, #e3e3e3);
          display: flex;
          align-items: center;
          justify-content: center;
          object-fit: contain;
          overflow: hidden;

          img {
            width: 100%;
          }
        }
      }

      .product-data {
        font-family: Montserrat-Regular;
        color: var(--primary-grey);

        h2 {
          color: black;
        }

        .price {
          margin-bottom: 2rem;

          span {
            font-size: 1rem;
          }

          span:first-child {
            margin-right: 2rem;
            font-weight: 600;
          }
        }

        .colors {
          p {
            margin-bottom: 2rem;
          }

          .color-wrapper {
            display: flex;
            gap: 2rem;
            margin-bottom: 2rem;

            .color {
              display: flex;
              align-items: center;
              gap: 1rem;
              text-transform: uppercase;
              font-size: 0.8rem;

              div {
                width: 1rem;
                height: 1rem;
                border-radius: 900px;
                background-color: black;
                position: relative;
              }

              .active:before {
                content: " ";
                width: 1.2rem;
                height: 1.2rem;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border: 2px #aaaaaa dotted;
                border-radius: 900px;
                position: absolute;
              }
            }
          }
        }

        .product-attributes {
          .attributes-wrapper {
            display: flex;
            gap: 4rem;
            margin-bottom: 2rem;

            form {
              label {
                display: block;
                margin-bottom: 2rem;
                font-size: 0.9rem;
              }

              select {
                background-color: var(--tertiary-grey);
                outline: none;
                border: none;
                border-radius: none;
                padding: 0.6rem;
              }
            }

            .product-controls {
              span {
                margin-bottom: 2rem;
                font-size: 0.9rem;
                display: block;
              }

              .controls {
                display: flex;
                gap: 1rem;

                div {
                  padding: 0.5rem 1.5rem;
                  background-color: var(--tertiary-grey);
                  cursor: pointer;
                }
              }
            }
          }

          .button {
            width: 100%;
            padding: 0.6rem 0rem;
            margin-bottom: 2rem;
            text-align: center;
            text-transform: uppercase;
            background: black;
            color: #fff;
            font-family: BauerBodoniStd-Roman;
            cursor: pointer;
          }

          .error {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            padding: 0.5rem 0rem;
            text-align: center;
            background: rgb(255, 181, 181);
          }
        }

        .product-description {
          padding: 1rem;
          border-top: 1px #aaaaaa solid;
          border-bottom: 1px #aaaaaa solid;

          span {
            display: block;
            margin-bottom: 1rem;
          }

          p {
            line-height: 1.5rem;
          }
        }
      }
    }
  }

  .other-products {
    width: 80%;
    margin: auto;
  }

  @media screen and (max-width: 500px) {
    .product-wrapper {
      width: 80%;
      margin: auto;

      h2 {
        margin-bottom: 3rem;
        color: var(--primary-grey);
        font-family: BauerBodoniStd-Roman;
      }

      .product-details {
        display: flex;
        flex-direction: column;
        gap: 4rem;

        .product-images {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas:
            "main-image"
            "nav-images";
          gap: 2rem;

          .nav-images {
            display: flex;
            gap: 1rem;
          }

          .nav-images div {
            grid-area: nav-images;
            margin-bottom: 0rem;

            img {
              width: 4.5rem;
            }
          }

          .main-image {
            grid-area: main-image;
            width: 100%;
            height: 20rem;
            position: relative;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }

        .product-data {
          .colors {
            .color-wrapper {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
            }
          }
        }
      }
    }

    .other-products {
      margin-bottom: 4rem;
    }
  }
`;

export default SingleProduct;
