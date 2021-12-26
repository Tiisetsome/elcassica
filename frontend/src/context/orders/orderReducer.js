import {
  FETCHED_ORDERS,
  CREATE_ORDER,
  ORDER_SUCCESS,
  FETCH_CUSTOMER_ORDERS,
} from "./orderConstants";

const OrderReducer = (state, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case FETCHED_ORDERS:
      return {
        ...state,
        dashOrders: action.payload,
      };
    case FETCH_CUSTOMER_ORDERS:
      return {
        ...state,
        customerDashOrders: action.payload,
      };
    case ORDER_SUCCESS:
      return {
        ...state,
        success: true,
        orders: [],
      };
    default:
      return state;
  }
};

export default OrderReducer;
