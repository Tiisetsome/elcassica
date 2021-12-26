import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiLinkExternal } from "react-icons/bi";
import { Link } from "react-router-dom";

import Container from "../../../containers/Container";
import OrderStatusNotifier from "../../UI/OrderStatusNotifier";
import Tracking from "../../UI/Tracking";
import { formatDateToString } from "../../../HOC/shop/shopActions";
import Filter from "../../UI/Filter";

const OrderCustomerDetails = ({
  orderId,
  order,
  user,
  token,
  updateOrderHandler,
}) => {
  const [activeLink, setActiveLink] = useState(true);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [currentOrderStatus, setCurrentOrderStatus] = useState("");

  const updateCustomerOrder = (UpdatedOrderStatus) => {
    const customerOrder = JSON.parse(JSON.stringify(order));
    const { _id: omitted, ...updatedOrder } = customerOrder;
    updatedOrder.status = UpdatedOrderStatus;

    updateOrderHandler(token, order._id, updatedOrder);
  };

  const statusOnchangeHandler = (event) => {
    const { _id: omitted, ...updatedOrder } = order;
    updatedOrder.currentStatus = event.target.value;

    setCurrentOrderStatus(event.target.value);
    updateOrderHandler(token, order._id, updatedOrder);
  };

  const getStatusColor = (status) => {
    const colors = {
      processing: "#009d54",
      shipped: "#927500",
      delivered: "#bf0059",
    };
    return colors[status.toLowerCase()];
  };

  const filterOrders = (link, statusIndex) => {
    const OrderStatusValuesArr = [...orderStatuses];
    const OrderStatusKeysArr = Object.keys(order.status);
    const newOrderStatus = {};
    OrderStatusValuesArr[statusIndex] = !OrderStatusValuesArr[statusIndex];

    OrderStatusKeysArr.forEach((key, index) => {
      newOrderStatus[key] = OrderStatusValuesArr[index];
    });

    setOrderStatuses(OrderStatusValuesArr);
    updateCustomerOrder(newOrderStatus);
  };

  useEffect(() => {
    if (order) {
      setOrderStatuses(Object.values(order.status));
      setCurrentOrderStatus(order.currentStatus);
    }
  }, [order]);
  return (
    <OrderCustomerDetailsStyles>
      <Container
        label={`Order #${orderId?.slice(0, 6).toUpperCase()}`}
        InfoComponent={OrderStatusNotifier}
        componentExists={true}
        style={{ height: "100%" }}
      >
        {order && (
          <div className="customer-details-wrapper">
            <div className="customer-details">
              <div className="user-info">
                <div>
                  <span>Customer : </span>
                  <span>{`${user?.name} ${user?.lastName}`}</span>
                </div>
                <div>
                  <span>Order Status : </span>
                  <span
                    style={{
                      backgroundColor: getStatusColor(currentOrderStatus),
                    }}
                  ></span>
                </div>
                <div className="user-link flex-2">
                  <span style={{ fontFamily: "Montserrat-Regular" }}>
                    View Profile{" "}
                  </span>
                  <BiLinkExternal
                    style={{ fontSize: ".9rem", cursor: "pointer" }}
                  />
                </div>
              </div>
              <div>
                <span>Order Progress :</span>
                <Filter
                  optionOne="Processing"
                  optionTwo="Shipped"
                  optionThree="Delivered"
                  filterHandler={filterOrders}
                  filterOptions={orderStatuses}
                  activeLink={activeLink}
                  renderStyles={true}
                />
                <form>
                  <div>
                    <label>Change Status:</label>
                    <select
                      name="orderStatus"
                      onChange={(e) => statusOnchangeHandler(e)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
            <div className="user-addresses">
              <div className="billing">
                <span className="heading">Billing Address</span>
                <div>
                  <span>{order.shippingAddress.province}</span>
                  <span>{order.shippingAddress.city}</span>
                  <span>{order.shippingAddress.streetAddress}</span>
                  <span>{order.shippingAddress.surbub}</span>
                  <span>{order.shippingAddress.zipCode}</span>
                  <span>{formatDateToString(order.createdAt)}</span>
                </div>
                <div className="email">
                  <span>Email Address :</span>
                  <span>{order.shippingAddress.email}</span>
                </div>
                <div className="phone">
                  <span>Phone :</span>
                  <span>{order.shippingAddress.phoneNumber}</span>
                </div>
              </div>
              <div className="shipping">
                <span className="heading">Shipping Address</span>
                <div>
                  <span>{order.shippingAddress.province}</span>
                  <span>{order.shippingAddress.city}</span>
                  <span>{order.shippingAddress.streetAddress}</span>
                  <span>{order.shippingAddress.surbub}</span>
                  <span>{order.shippingAddress.zipCode}</span>
                  <span>{formatDateToString(order.createdAt)}</span>
                </div>
              </div>
              <div className="shipping">
                <span className="heading">Order Tracking</span>
                <Tracking orderTracking={order.status} />
              </div>
            </div>
          </div>
        )}
      </Container>
    </OrderCustomerDetailsStyles>
  );
};

const OrderCustomerDetailsStyles = styled.div`
  .customer-details-wrapper {
    padding: 2rem 1rem;
    height: 100% !important;

    .customer-details {
      display: flex;
      gap: 6rem;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px #f1f1f1 solid;

      .user-info {
        div {
          margin-bottom: 1rem;

          span:first-child {
            margin-right: 0.5rem;
            font-family: Montserrat-Semibold;
          }
        }

        div:nth-child(2) span:last-child {
          width: 8px;
          height: 8px;
          border-radius: 8px;
          display: inline-block;
          backgroundcolor: #fff;
        }

        .user-link:hover {
          color: var(--light-blue-color);

          span {
            cursor: pointer;
          }
        }

        div:last-child {
          grid-column: 1 / span 2;
        }
      }

      form {
        padding-bottom: 1rem;

        div {
          label {
            display: block;
            margin-bottom: 1rem;
          }

          select {
            width: 12rem;
            padding: 0.2rem;
            border: 1px #aaaaaa solid;
            font-family: Montserrat-Regular;
            font-size: 0.7rem;
            outline: none;
            background-color: var(--light-grey-extra);
          }
        }
      }
    }

    .user-addresses {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;

      .billing,
      .shipping {
        .heading {
          display: block;
          font-size: 0.75rem;
          font-family: Montserrat-Semibold;
          margin-bottom: 2rem;
        }

        span {
          display: block;
          margin-bottom: 1rem;
        }

        .email,
        .phone {
          span:first-child {
            font-family: Montserrat-Medium;
            margin-top: 2rem;
          }
        }
      }
    }
  }
`;

export default OrderCustomerDetails;
