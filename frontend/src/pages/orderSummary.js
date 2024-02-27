import React, { useContext, useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import styled from "styled-components";

import Navigation from "../components/Navigation/Navigation";
import ProductsContext from "../context/products/productsContext";
import UserContext from "../context/users/userContext";
import OrderContext from "../context/orders/orderContext";

const OrderSummary = () => {
  const productsContext = useContext(ProductsContext);
  const userContext = useContext(UserContext);
  const orderContext = useContext(OrderContext);

  const [sdkReady, setSdkReady] = useState(false);

  const { cartItems, resetCart } = productsContext;
  const { userLogin, shippingAddress } = userContext;
  const { orders, createOrder, updateOrder } = orderContext;

  const prepareOrder = () => {
    return {
      orderItems: cartItems.map((item) => {
        return {
          name: item.name,
          quantity: Number(item.quantity),
          imageUrl: item.imageUrl,
          price: Number(item.price),
          size: item.size,
          color: item.color,
          product: item.product,
          shop: item.shop,
          category: item.category,
        };
      }),
      shippingAddress,
      totalPrice: cartItems.reduce(
        (totalAmount, item) => totalAmount + item.total,
        0
      ),
      paymentMethod: "paypal",
    };
  };

  const placeOrderHandler = () => {
    const newOrder = prepareOrder();
    createOrder(newOrder, userLogin.token);
  };

  const updateOrderToPaid = () => {
    if (orders.length > 0 && !orders[0].isPaid) {
      updateOrder(orders[0]._id, userLogin.token);
    }
  };

  const successPaymentHandler = (paymentResults) => {
    updateOrderToPaid();
    resetCart();
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((totalAmount, order) => {
      return order.total + totalAmount;
    }, 0);
  };

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `"https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
      return () => document.removeChild(script);
    };

    if (orders.length > 0) {
      if (!orders[0].isPaid || !window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [orders]);

  const history = useHistory();

  useEffect(() => {
    if (cartItems.length === 0) {
      history.replace("/order/success", { path: history.location.pathname });
    }
  }, [cartItems]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Fragment>
      <Navigation />
      <OrderSummaryStyles>
        <div>
          <section className="cart-items">
            <h2>Order Summary</h2>
            {cartItems.length > 0 &&
              cartItems.map((item) => {
                return (
                  <div className="item" key={item.product}>
                    <div>
                      <div>
                        <img src={item.imageUrl} />
                      </div>
                    </div>
                    <div className="item-summary">
                      <p>{item.name}</p>
                      <p>{`${item.quantity} x R${item.price} = R${
                        item.quantity * item.price
                      }`}</p>
                    </div>
                  </div>
                );
              })}
          </section>
          <section className="payment">
            <h2>Payment Method</h2>
            <p>PayPal</p>
          </section>
          <section className="shipping">
            <h2>Shipping Address</h2>
            {shippingAddress !== null && (
              <p>
                {shippingAddress.province}, {shippingAddress.surbub},{" "}
                {shippingAddress.zipCode}
              </p>
            )}
          </section>
        </div>
        {cartItems.length > 0 && (
          <div
            className={
              orders.length > 0 && !orders[0].isPaid
                ? "total-costs paypal-render"
                : "total-costs"
            }
          >
            <div className="totals">
              <h4>Sub-total</h4>
              <p>R {calculateTotalAmount()}</p>
            </div>
            <div className="totals">
              <h4>Shipping</h4>
              <p>R 200</p>
            </div>
            <div className="totals">
              <h4>Total-Amount</h4>
              <p>R {calculateTotalAmount() + 200}</p>
            </div>
            {orders.length > 0 && !orders[0].isPaid ? (
              <div className="paypal-buttons">
                <PayPalButton
                  amount={orders[0].totalPrice}
                  onSuccess={successPaymentHandler}
                />
              </div>
            ) : (
              <div className="button" onClick={placeOrderHandler}>
                Place Order
              </div>
            )}
          </div>
        )}
      </OrderSummaryStyles>
    </Fragment>
  );
};

const OrderSummaryStyles = styled.main`
  width: 80%;
  margin: 5rem auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  position: relative;

  h2 {
    padding-bottom: 1rem;
    border-bottom: 1px #e3e3e3 solid;
    font-size: 1rem;
    font-weight: 500;
  }

  .cart-items {
    margin-bottom: 1rem;
    .item {
      display: flex;
      gap: 2rem;
      padding: 1rem 0rem;
      border-bottom: 1px #e3e3e3 solid;

      div:first-child {
        div {
          width: 3rem;
          height: 3rem;
          object-fit: contain;
          overflow: hidden;
          background: var(--tertiary-grey);

          img {
            width: 3rem;
          }
        }
      }

      .item-summary {
        width: 18rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
      }
    }
  }

  .payment,
  .shipping {
    margin-bottom: 1rem;
    h2 {
      border: none;
    }

    p {
      border-bottom: 1px #e3e3e3 solid;
      padding-bottom: 1rem;
      font-size: 0.9rem;
    }
  }

  .total-costs {
    margin-top: 2.4rem;
    width: 20rem;
    height: 18rem;
    border: 1px #e3e3e3 solid;
    padding: 1rem;

    .totals {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
      padding: 1rem 0rem;
      border-bottom: 1px #e3e3e3 solid;
      width: 17.5rem;

      h4 {
        font-size: 1rem;
        font-weight: 500;
      }

      p {
        width: 6rem;
        font-size: 0.9rem;
      }
    }

    .button {
      display: block;
      width: 100%;
      padding: 0.6rem 0rem;
      margin: 2rem 0rem;
      text-align: center;
      text-transform: uppercase;
      background: black;
      color: #fff;
      font-family: Montserrat-SemiBold;
      cursor: pointer;
      font-size: 0.8rem;
    }

    .paypal-buttons {
      margin-top: 1rem;
    }
  }

  .paypal-render {
    height: 22rem;
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 2rem;

    .cart-items {
      .item {
        gap: 0rem;
        padding: 1rem 0rem;

        div:first-child {
          div {
            width: 4rem;
            height: 4rem;

            img {
              width: 100%;
            }
          }
        }

        .item-summary {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }
      }
    }

    .payment,
    .shipping {
      margin-bottom: 1rem;
      h2 {
        border: none;
      }

      p {
        border-bottom: 1px #e3e3e3 solid;
        padding-bottom: 1rem;
        font-size: 0.9rem;
      }
    }

    .total-costs {
      margin-top: 2.4rem;
      width: 100%;
      height: 18rem;
      border: 1px #e3e3e3 solid;
      padding: 1rem;

      .totals {
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        padding: 1rem 0rem;
        border-bottom: 1px #e3e3e3 solid;
        width: 17.5rem;

        h4 {
          font-size: 1rem;
          font-weight: 500;
        }

        p {
          width: 6rem;
          font-size: 0.9rem;
        }
      }

      .button {
        display: block;
        width: 100%;
        padding: 0.6rem 0rem;
        margin: 2rem 0rem;
        text-align: center;
        text-transform: uppercase;
        background: black;
        color: #fff;
        font-family: Montserrat-SemiBold;
        cursor: pointer;
        font-size: 0.8rem;
      }

      .paypal-buttons {
        margin-top: 1rem;
      }
    }

    .paypal-render {
      height: 22rem;
    }
  }
`;

export default OrderSummary;
