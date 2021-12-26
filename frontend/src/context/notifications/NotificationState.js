import React, { useReducer } from "react";
import NotificationContext from "./notificationContext";
import NotificationReducer from "./notificationReducer";
import { PRODUCTS_OUT_OF_STOCK } from "./notificationConstants";

const NotificationState = ({ children }) => {
  const initialState = {
    productsOutOfStock: 0,
  };

  const [state, dispatch] = useReducer(NotificationReducer, initialState);

  const addOutOfStockNotification = (numberOfItems) => {
    dispatch({
      type: PRODUCTS_OUT_OF_STOCK,
      payload: numberOfItems,
    });
  };
  return (
    <NotificationContext.Provider
      value={{
        productsOutOfStock: state.productsOutOfStock,
        addOutOfStockNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationState;
