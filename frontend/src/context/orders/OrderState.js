import React, { useReducer } from "react";
import axios from "axios";
import OrderContext from "./orderContext";
import OrderReducer from "./orderReducer";
import {
  FETCHED_ORDERS,
  FETCH_CUSTOMER_ORDERS,
  CREATE_ORDER,
  ORDER_SUCCESS,
} from "./orderConstants";

const OrderState = ({ children }) => {
  const initialState = {
    orders: [],
    dashOrders: [],
    customerDashOrders: [],
    success: false,
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const setHeaders = (token) => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchOrders = async (token) => {
    try {
      const { data } = await axios.get("/api/order", setHeaders(token));
      if (data) {
        dispatch({
          type: FETCHED_ORDERS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const createOrder = async (order, token) => {
    try {
      const { data } = await axios.post(
        "/api/order/",
        order,
        setHeaders(token)
      );
      if (data) {
        dispatch({
          type: CREATE_ORDER,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const fetchSpecificCustomerOrders = async (token, id) => {
    try {
      const { data } = await axios.get(
        `/api/order/user/${id}`,
        setHeaders(token)
      );
      if (data) {
        dispatch({
          type: FETCH_CUSTOMER_ORDERS,
          payload: data,
        });
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.log("Server Problem");
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  const updateOrder = async (orderId, token) => {
    try {
      const { data } = await axios.put(
        `/api/order/${orderId}`,
        {},
        setHeaders(token)
      );
      if (data) {
        dispatch({
          type: ORDER_SUCCESS,
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const updateOrderByAdmin = async (token, orderId, updatedOrder) => {
    try {
      const { data } = await axios.put(
        `/api/order/update/${orderId}`,
        updatedOrder,
        setHeaders(token)
      );
      if (data) {
        fetchOrders(token);
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.log("Server Problem");
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  const updateCustomerShippingAddress = async (
    token,
    shippingAddress,
    orderId
  ) => {
    try {
      const { data } = await axios.put(
        `/api/order/shipping/${orderId}`,
        shippingAddress,
        setHeaders(token)
      );
      if (data) {
        return true;
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.log("Server Problem");
      } else {
        console.log(error.response.data.message);
      }
      return false;
    }
  };

  const cancelOrder = async (token, reason, orderId, userId) => {
    try {
      const { data } = await axios.put(
        `/api/order/cancel/${orderId}`,
        reason,
        setHeaders(token)
      );
      if (data) {
        fetchSpecificCustomerOrders(token, userId);
        return true;
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.log("server problem");
      } else {
        console.log(error.response.data.message);
      }
      return false;
    }
  };

  const deleteOrder = async (orderId, token) => {
    try {
      const { data } = await axios.delete(
        `/api/order/${orderId}`,
        setHeaders(token)
      );
      if (data) {
        fetchOrders(token);
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.log("Server Problem");
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        dashOrders: state.dashOrders,
        customerDashOrders: state.customerDashOrders,
        success: state.success,
        createOrder,
        fetchOrders,
        fetchSpecificCustomerOrders,
        updateOrder,
        updateOrderByAdmin,
        updateCustomerShippingAddress,
        cancelOrder,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
