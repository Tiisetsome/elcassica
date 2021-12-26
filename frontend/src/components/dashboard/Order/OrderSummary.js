import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { FaCartPlus, FaEye } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

import Container from "../../../containers/Container";
import OrderContext from "../../../context/orders/orderContext";
import DropDown from "../../Buttons/DropDown";
import CircularProgress from "../../CircularProgress/CircularProgress";
import MessageNotifications from "./MessageNotifications/MessageNotifications";
import { formatDateToString } from "../../../HOC/shop/shopActions";

const OrderSummary = ({ user }) => {
  const orderContext = useContext(OrderContext);

  const { dashOrders, deleteOrder } = orderContext;
  const [ordersToShow, setOrdersToShow] = useState([]);
  const [ordersCurrentYearDisplay, setOrdersCurrentYearDisplay] = useState(
    new Date().getFullYear()
  );

  const selectedYearOrders = (selectedYear) => {
    const orders = dashOrders.filter((order) => {
      const yearOrderCreated = new Date(order.createdAt).getFullYear();
      if (yearOrderCreated === selectedYear) {
        return order;
      }
    });
    setOrdersToShow(orders);
  };

  const getOrderNotification = () => {
    const orders = dashOrders.filter(
      (order) =>
        order.currentStatus.toLowerCase() !== "shipped" &&
        order.currentStatus.toLowerCase() !== "delivered"
    );

    return orders.length > 0 ? (
      <MessageNotifications ordersCount={orders.length} />
    ) : null;
  };

  const orderDeleteHandler = (orderId) => {
    deleteOrder(orderId, user.token);
  };

  useEffect(() => {
    selectedYearOrders(ordersCurrentYearDisplay);
  }, []);

  return (
    <OrderSummaryStyles>
      <section className="order-overview">
        <Container
          label="Orders"
          InfoComponent={DropDown}
          componentExists={true}
          style={{
            boxShadow: "20px 0px 50px rgba(214, 214, 214, 0.2)",
            zIndex: 100,
          }}
          changeYearDisplayHandler={selectedYearOrders}
        >
          <div className="cards">
            <CircularProgress
              heading="Total Orders"
              count={ordersToShow.length}
              color="#bf0059"
              shadowColor="0px 0px 25px rgba(191, 0, 89, 0.3)"
              Icon={FaCartPlus}
              iconSize={1.3}
            />
            <div className="line"></div>
            <CircularProgress
              heading="Cancelled Orders"
              count={75}
              color="#05496b"
              shadowColor="0px 0px 25px rgba(5, 73, 107, 0.2)"
              Icon={MdRemoveShoppingCart}
              iconSize={1.4}
            />
            {getOrderNotification()}
          </div>
        </Container>
        <Container
          label="The Following Orders Have Been Cancelled"
          componentExists={false}
          padding={{ padding: ".42rem 0rem" }}
        >
          {ordersToShow.length > 0 &&
            ordersToShow.map((order) => {
              return (
                order.cancellation.status && (
                  <div className="item-wrapper">
                    <div className="item-img">
                      <img src={order.orderItems[0].imageUrl} />
                    </div>
                    <div className="item-details">
                      <div>
                        <span>Order Id : </span>
                        <span>#{order._id}</span>
                      </div>
                      <div>
                        <span>Total Amount : </span>
                        <span>R {order.totalPrice}</span>
                      </div>
                      <div>
                        <span>Cancellation Date : </span>
                        <span>{formatDateToString(order.updatedAt)}</span>
                      </div>
                    </div>
                    <div className="item-btns flex-2">
                      <Link
                        to={`/dashboard/order/${order._id}`}
                        style={{ color: "var(--grey-color)" }}
                      >
                        <div className="btn flex-3">
                          <FaEye style={{ fontSize: ".8rem" }} />
                        </div>
                      </Link>
                      <div
                        className="btn flex-3 cancel-icon"
                        onClick={() => orderDeleteHandler(order._id)}
                      >
                        <div className="cancel-icon-wrapper">
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
        </Container>
      </section>
    </OrderSummaryStyles>
  );
};

const OrderSummaryStyles = styled.section`
  .order-overview {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .cards {
      padding: 3rem 1rem;
      display: grid;
      grid-template-columns: 1fr 1px 1fr;
      gap: 4rem;

      .line {
        width: 1px;
        height: 10rem;
        margin-top: 3rem;
        background-color: var(--light-grey);
      }
    }

    .notification-msg {
      grid-column: 1 / span 3;
      background: #fff;
      border: 1px #d6d6d6 solid;
      width: 80%;
      margin: 0rem auto;
      position: relative;

      &:before {
        content: " ";
        left: -1.5rem;
        top: 0;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: var(--green-color);
        position: absolute;
      }

      .notice {
        padding: 1.5rem 1rem;
        line-height: 1.5rem;
      }

      .notification-header {
        justify-content: space-between;
        padding: 0.8rem;
        border-bottom: 1px #d6d6d6 solid;

        p {
          font-family: Montserrat-Semibold;
          font-size: 0.75rem;
          color: var(--grey-color);
        }

        span {
          font-size: 0.7rem;
        }
      }
    }
  }

  .item-wrapper {
    padding: 2rem 2rem;
    display: flex;
    gap: 1rem;
    border-bottom: 1px #d6d6d6 solid;

    &:last-child {
      border-bottom: unset;
    }

    .item-img {
      width: 5rem;
      height: 5rem;
      background-color: var(--grey-color);
      object-fit: contain;
      overflow: hidden;
      position: relative;

      &:before {
        content: "";
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: black;
        opacity: 0.2;
        position: absolute;
        z-index: 1000;
      }

      img {
        width: 5rem;
      }
    }

    .item-details {
      font-size: 0.7rem;

      div {
        margin-bottom: 1rem;

        span:first-child {
          font-family: Montserrat-Medium;
        }

        span:last-child {
          margin-left: 1rem;
        }
      }
    }

    .item-btns {
      gap: 2rem;
      margin-left: 3rem;

      .btn {
        width: 1.5rem;
        height: 1.5rem !important;
        border-radius: 50%;
        box-shadow: 0px 0px 10px rgba(5, 73, 107, 0.2);
        cursor: pointer;
      }

      .btn:hover {
        box-shadow: 0px 0px 10px rgba(5, 73, 107, 0.4);
        transition: all 0.2s;
      }

      .cancel-icon {
        .cancel-icon-wrapper {
          div {
            width: 0.8rem;
            height: 1px;
            transform: rotate(45deg);
            background-color: var(--grey-color);
          }

          div:last-child {
            transform: rotate(-45deg);
          }
        }
      }
    }
  }
`;

export default OrderSummary;
