import React, { useContext } from "react";
import styled from "styled-components";

import NotificationContext from "../../context/notifications/notificationContext";
import ProductsNotifications from "../dashboard/Products/ProductsNotifictions/ProductsNotifications";
import OrderNotification from "../dashboard/Order/MessageNotifications/OrderNotification";
import CancelledOrderNotification from "../dashboard/Order/MessageNotifications/CancelledOrderNotification";

const Notifications = ({
  orders,
  products,
  notifications,
  notificationHandler,
  customers,
}) => {
  const notificationContext = useContext(NotificationContext);

  const { addOutOfStockNotification } = notificationContext;

  const getOrderNotification = () => {
    const ordersNeedingShipping = orders.filter(
      (order) =>
        order.currentStatus.toLowerCase() !== "shipped" &&
        order.currentStatus.toLowerCase() !== "delivered"
    );

    if (
      ordersNeedingShipping.length > 0 &&
      !notifications.itemsNotificationCounted
    ) {
      notificationHandler(1, "itemsNotificationCounted");
    }

    return ordersNeedingShipping.length > 0 ? (
      <OrderNotification ordersCount={ordersNeedingShipping.length} />
    ) : null;
  };

  const getProductsNotification = () => {
    const outOfStockLimit = 5;
    const productsAboutToGetOutOfStock = products.filter(
      (product) => product.quantity <= outOfStockLimit
    );

    if (
      productsAboutToGetOutOfStock.length > 0 &&
      !notifications.placedOrderNotificationCounted
    ) {
      notificationHandler(1, "placedOrderNotificationCounted");
      addOutOfStockNotification(productsAboutToGetOutOfStock.length);
    }

    return productsAboutToGetOutOfStock.length > 0 ? (
      <ProductsNotifications products={productsAboutToGetOutOfStock} />
    ) : null;
    // return null; //to be replaced with the above commented code
  };

  const getOrderCancellationNotification = () => {
    const cancelledOrders = orders.filter((order) => {
      if (order.cancellation?.status) {
        return order;
      }
    });

    if (
      cancelledOrders.length > 0 &&
      !notifications.canceledOrderNotificationCounted
    ) {
      notificationHandler(
        cancelledOrders.length,
        "canceledOrderNotificationCounted"
      );
    }

    return cancelledOrders.length > 0 ? (
      <CancelledOrderNotification
        cancelledOrders={cancelledOrders}
        customers={customers}
      />
    ) : null;
  };

  return (
    <NotificationStyles className="notification-wrapper">
      {getOrderNotification()}
      {getOrderCancellationNotification()}
      {getProductsNotification()}
    </NotificationStyles>
  );
};

const NotificationStyles = styled.div`
  margin-top: 2rem;
  padding-right: 2rem;
  height: 35rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.7vw;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10rem;
    background: var(--light-grey);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--grey-color);
    transition: all 0.2s;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10rem;
    background: #fff;
  }

  &::-webkit-scrollbar-track:hover {
    background: var(--light-grey);
    transition: all 0.2s;
  }

  .notification-icon {
    width: 1.2rem;
    height: 1.2rem;
    top: 0;
    left: -2.8rem;
    transform: rotate(45deg);
    position: absolute;
    background-color: #fff;
    box-shadow: 0px 0px 25px rgba(0, 157, 84, 0.5);

    div {
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      background-color: var(--pink-color);
    }
  }

  .notification-line {
    top: 1.6rem;
    left: -2.26rem;
    width: 2px;
    height: calc(100% + 0.1rem);
    border-radius: 1px;
    background-color: var(--pink-color);
    position: absolute;
  }

  .notification-line:last-child {
    display: none;
  }

  .message {
    padding: 1.5rem 1rem;

    p {
      margin-bottom: 0.8rem;
      font-size: 0.7rem;
      line-height: 1.4rem;
    }

    .link {
      margin-bottom: 0rem;
    }

    ul {
      margin-left: 1rem;

      li {
        margin-bottom: 0.5rem;
        font-size: 0.7rem;
        line-height: 1rem;
      }
    }
  }

  .notification:last-child {
    margin-bottom: 0rem;
  }
`;

export default Notifications;
