import { Link } from "react-router-dom";

import NotificationContainer from "../../../../containers/NotificationContainer";
import { formatDateToString } from "../../../../HOC/shop/shopActions";
const OrderNotification = ({ ordersCount }) => {
  return (
    <NotificationContainer
      header="Order needs to be processed"
      date={formatDateToString(new Date())}
    >
      <div className="notification-icon flex-3">
        <div style={{ backgroundColor: "var(--pink-color" }}></div>
      </div>
      <div
        className="notification-line"
        style={{ backgroundColor: "var(--pink-color" }}
      ></div>
      <div className="message">
        <p>
          {ordersCount} Orders have been placed and need to be processed as soon
          as possible. Click the link below to navigate to orders.
        </p>
        <Link to="/dashboard/orderOverview" style={{ color: "#20b9b4" }}>
          <p>See Orders</p>
        </Link>
      </div>
    </NotificationContainer>
  );
};

export default OrderNotification;
