import { PRODUCTS_OUT_OF_STOCK } from "./notificationConstants";

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case PRODUCTS_OUT_OF_STOCK:
      return {
        ...state,
        productsOutOfStock: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default NotificationReducer;
