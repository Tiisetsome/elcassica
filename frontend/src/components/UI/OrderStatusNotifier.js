import React from "react";
import { StatusNotifierStyles } from "../Styles/StatusNotifierStyles";

const OrderStatusNotifier = () => {
  return (
    <StatusNotifierStyles className="flex-3">
      <div className="note flex-3">
        <div style={{ backgroundColor: "var(--green-color)" }}></div>
        <span>Active</span>
      </div>
      <div className="note flex-3">
        <div style={{ backgroundColor: "var(--gold-color)" }}></div>
        <span>Shipped</span>
      </div>
      <div className="note flex-3">
        <div style={{ backgroundColor: "var(--pink-color)" }}></div>
        <span>Delivered</span>
      </div>
    </StatusNotifierStyles>
  );
};

export default OrderStatusNotifier;
