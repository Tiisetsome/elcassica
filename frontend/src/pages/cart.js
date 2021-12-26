import React, { useContext, useEffect, Fragment } from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductsContext from "../context/products/productsContext";
import CartTotals from "../components/Store/CartTotals/CartTotals";
import Navigation from "../components/Navigation/Navigation";

const Cart = () => {
  const productsContext = useContext(ProductsContext);
  const { cartItems, updateCartProduct, deleteCartProduct } = productsContext;

  const updateItemHandler = (product, productQuantity) => {
    const total = product.price * productQuantity;
    product.quantity = productQuantity;
    product.total = total;
    updateCartProduct(product);
  };

  const evaluateHandler = (productId, operator) => {
    const product = [...cartItems].find((item) => item.product === productId);
    if (operator === "+") {
      const qty = product.quantity + 1;
      updateItemHandler(product, qty);
    } else if (operator === "-" && product.quantity > 1) {
      const qty = product.quantity - 1;
      updateItemHandler(product, qty);
    }
  };

  const capitalizeWord = (word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfTheWord = word.slice(1, word.length);
    return firstLetter + restOfTheWord;
  };

  const calculateTotalAmountPayable = () => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.total;
    });
    return totalAmount;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Navigation />

      <CartStyles>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Size</th>
              <th>Color</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          {cartItems.length > 0 && (
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr key={item.product}>
                    <td>
                      <div className="product-img-container">
                        <div>
                          <img src={item.imageUrl} />
                        </div>
                      </div>
                    </td>
                    <td>{item.size}</td>
                    <td className="color">
                      <div className="product-color">
                        <div style={{ backgroundColor: `${item.color}` }}></div>
                        <span>{capitalizeWord(item.color)}</span>
                      </div>
                    </td>
                    <td>R {item.price}</td>
                    <td>R {item.total}</td>
                    <td>
                      <div className="controls">
                        <div onClick={() => evaluateHandler(item.product, "-")}>
                          -
                        </div>
                        <div>{item.quantity}</div>
                        <div onClick={() => evaluateHandler(item.product, "+")}>
                          +
                        </div>
                      </div>
                    </td>
                    <td>
                      <FaTrash
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteCartProduct(item.product)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {cartItems.length === 0 && (
          <h3 className="empty-cart-notice">Your cart is currently empty</h3>
        )}
        <Link to="/main-shop/" style={{ textDecoration: "none" }}>
          <section className="shopping">
            <BsArrowLeft style={{ fontSize: "1rem" }} />
            <p>Contnue shopping</p>
          </section>
        </Link>
        {cartItems.length > 0 && (
          <CartTotals
            totalPayable={calculateTotalAmountPayable()}
            isShippingCompleted={false}
          />
        )}
      </CartStyles>
    </Fragment>
  );
};

const CartStyles = styled.main`
  width: 80%;
  margin: 5rem auto;

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;

    thead {
      border-top: 1px #aaaaaa solid;
      border-bottom: 1px #aaaaaa solid;

      tr {
        th {
          padding: 1.5rem 0rem;
          font-size: 0.9rem;
        }
      }
    }

    tbody {
      tr {
        text-align: center;
        border-bottom: 1px #e3e3e3 solid;

        td {
          padding: 1rem 0rem;
          font-size: 0.9rem;

          .product-img-container {
            display: flex;
            justify-content: center;
            width: 100%;

            div {
              width: 5rem;
              height: 6rem;
              object-fit: contain;
              overflow: hidden;
              background: var(--tertiary-grey);

              img {
                width: 5rem;
              }
            }
          }

          .controls {
            display: flex;
            justify-content: center;
            gap: 1rem;

            div {
              padding: 0.3rem 0.8rem;
              background-color: var(--tertiary-grey);
              cursor: pointer;
            }
          }
        }
      }

      .color {
        .product-color {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: center;
          height: 100%;

          div {
            width: 1rem;
            height: 1rem;
            border-radius: 900px;
            background-color: black;
          }
        }

        span {
          display: block;
        }
      }
    }
  }

  .empty-cart-notice {
    margin-top: 2rem;
    font-size: 1.8rem;
    color: var(--primary-grey);
  }

  .shopping {
    margin: 2rem 0rem;
    width: 12rem;
    background-color: var(--fine-grey);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0.5rem 0rem;
    cursor: pointer;

    p {
      color: var(--primary-grey);
      font-family: Montserrat-Medium;
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 500px) {
    width: 80%;
    margin: 5rem auto;

    table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;

      thead {
        border-top: 1px #aaaaaa solid;
        border-bottom: 1px #aaaaaa solid;
        display: none;

        tr {
          th {
            padding: 1.5rem 0rem;
            font-size: 0.9rem;
          }
        }
      }

      tbody {
        tr {
          display: grid;
          grid-template-columns: repeat(1, 1fr);

          td {
            padding: 1rem 0rem;
            font-size: 0.9rem;

            .product-img-container {
              width: 100%;

              div {
                width: 10rem;
                height: 12rem;
                object-fit: cover;

                img {
                  width: 100%;
                }
              }
            }
          }

          td:nth-child(4) {
            display: none;
          }
        }
      }
    }
  }
`;

export default Cart;
