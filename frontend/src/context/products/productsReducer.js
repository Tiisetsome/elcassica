import {
  FETCH_PRODUCTS,
  ADD_ITEM,
  UPLOAD_PRODUCT_IMAGES,
  UPDATE_ITEM,
  DELETE_ITEM,
  RESET_CART,
  RESET_IMAGE_UPLOADS,
} from "./productConstants";

const ProductsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ADD_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case UPLOAD_PRODUCT_IMAGES:
      return {
        ...state,
        mainImageDisplay: action.payload.splice(0, 1)[0],
        uploadedImages: action.payload,
      };
    case UPDATE_ITEM:
      let product = state.cartItems.find(
        (item) => item.product == action.payload.product
      );
      product = action.payload;
      return {
        ...state,
      };
    case DELETE_ITEM:
      let cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
      return {
        ...state,
        cartItems,
      };
    case RESET_CART:
      return {
        ...state,
        cartItems: [],
      };
    case RESET_IMAGE_UPLOADS:
      return {
        ...state,
        mainImageDisplay: null,
        uploadedImages: [],
      };
    default:
      return state;
  }
};

export default ProductsReducer;
