import React from "react";

import { formatDateToString } from "../../../../HOC/shop/shopActions";
import NotificationContainer from "../../../../containers/NotificationContainer";

const CancelledOrderNotification = ({ cancelledOrders, customers }) => {
  const getCustomerFullName = (id) => {
    const customer = customers.find((customer) => customer._id === id);
    if (customer) {
      return `${customer.name} ${customer.lastName}`;
    }
    return null;
  };

  return (
    cancelledOrders.length > 0 &&
    cancelledOrders.map((order) => {
      return (
        <NotificationContainer
          header="Order has been cancelled"
          date={formatDateToString(new Date())}
          key={order._id}
        >
          <div className="notification-icon flex-3">
            <div style={{ backgroundColor: "var(--gold-color" }}></div>
          </div>
          <div
            className="notification-line"
            style={{ backgroundColor: "var(--gold-color" }}
          ></div>
          <div className="message">
            <p>
              {getCustomerFullName(order.user)} cancelled the order made on the{" "}
              {formatDateToString(order.updatedAt)}
            </p>
            <p>Reason :</p>
            <ul>
              <li>{order.cancellation.reason}</li>
            </ul>
          </div>
        </NotificationContainer>
      );
    })
  );
};

export default CancelledOrderNotification;
