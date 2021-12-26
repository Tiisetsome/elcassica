import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import ProductsState from "./context/products/ProductsState";
import UserState from "./context/users/UserState";
import OrderState from "./context/orders/OrderState";
import NotificationState from "./context/notifications/NotificationState";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserState>
        <OrderState>
          <ProductsState>
            <NotificationState>
              <App />
            </NotificationState>
          </ProductsState>
        </OrderState>
      </UserState>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
