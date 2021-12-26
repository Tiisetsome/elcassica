import {
  USER_PROFILE,
  ADD_SHIPPING_ADDRESS,
  FETCH_USERS,
  USER_LOGOUT,
} from "./userConstants";

const UserReducer = (state, action) => {
  switch (action.type) {
    case USER_PROFILE:
      return {
        ...state,
        userLogin: action.payload,
      };
    case ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case FETCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        userLogin: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
