import React, { useReducer } from "react";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import axios from "axios";
import {
  USER_PROFILE,
  ADD_SHIPPING_ADDRESS,
  FETCH_USERS,
  USER_LOGOUT,
} from "./userConstants";

const UserState = ({ children }) => {
  const initialState = {
    userLogin: null,
    users: [],
    shippingAddress: null,
  };

  const setHeaders = (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return config;
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const userSignUp = async (userData) => {
    try {
      const { data } = await axios.post("/api/users/", userData);
      return data.added;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const updateUserAccount = async (userId) => {
    try {
      const { data } = await axios.put(`/api/users/userAccount/${userId}`);
      if (data) {
        return data.updated;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getUserProfile = async (user) => {
    try {
      const { data } = await axios.post("/api/users/login/", user);
      if (data) {
        dispatch({
          type: USER_PROFILE,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async (token) => {
    try {
      const { data } = await axios.get("/api/users", setHeaders(token));
      if (data) {
        dispatch({
          type: FETCH_USERS,
          payload: data,
        });
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.log("Server problem");
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  const fetchSingleUser = async (token, userId) => {
    try {
      const { data } = await axios.get(
        `/api/users/${userId}`,
        setHeaders(token)
      );
      return data;
    } catch (error) {
      if (error.response.status === 500) {
        console.log("server problem");
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  const addShippingAddress = async (address) => {
    dispatch({
      type: ADD_SHIPPING_ADDRESS,
      payload: address,
    });
  };

  const logOutUser = async () => {
    dispatch({
      type: USER_LOGOUT,
      payload: null,
    });
  };

  return (
    <UserContext.Provider
      value={{
        userLogin: state.userLogin,
        shippingAddress: state.shippingAddress,
        users: state.users,
        getUserProfile,
        addShippingAddress,
        fetchUsers,
        userSignUp,
        updateUserAccount,
        fetchSingleUser,
        logOutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
