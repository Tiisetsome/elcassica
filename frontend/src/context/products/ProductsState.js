import React, { useReducer } from "react";
import axios from "axios";
import {
  FETCH_PRODUCTS,
  ADD_ITEM,
  UPLOAD_PRODUCT_IMAGES,
  UPDATE_ITEM,
  DELETE_ITEM,
  RESET_CART,
  RESET_IMAGE_UPLOADS,
} from "./productConstants";

import ProductsContext from "./productsContext";
import ProductsReducer from "./productsReducer";

const ProductsState = ({ children }) => {
  const initialState = {
    products: [],
    cartItems: [],
    mainImageDisplay: null,
    uploadedImages: [],
  };

  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  const setHeaders = (token, contentType, uploadPath) => {
    return {
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${token}`,
        uploadPath,
      },
    };
  };

  const addProduct = async (token, productData) => {
    try {
      const { data } = await axios.post(
        "/api/products/",
        productData,
        setHeaders(token, "application/json", "testing")
      );
      if (data) {
        fetchProducts();
        resetImageUploads();
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

  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products/");
    try {
      if (data) {
        dispatch({
          type: FETCH_PRODUCTS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateProduct = async (token, product, productId) => {
    try {
      const { data } = await axios.put(
        `/api/products/${productId}`,
        product,
        setHeaders(token, "application/json")
      );
      if (data) {
        fetchProducts();
        resetImageUploads();
        return true;
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.log("Server problem");
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  const deleteProductFormDB = async (token, productId) => {
    try {
      const { data } = await axios.delete(
        `/api/products/${productId}`,
        setHeaders(token, "application/json")
      );
      if (data && data.deleted) {
        fetchProducts();
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.log("server problem");
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  const addProductToCart = (product) => {
    dispatch({
      type: ADD_ITEM,
      payload: product,
    });
  };

  const uploadProductImages = async (formData, token, uploadPath) => {
    try {
      const { data } = await axios.post(
        "/api/products/imageUpload",
        formData,
        setHeaders(token, "application/json", uploadPath)
      );
      if (data) {
        dispatch({
          type: UPLOAD_PRODUCT_IMAGES,
          payload: data,
        });

        return true;
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.log("server problem");
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  const updateCartProduct = (product) => {
    dispatch({
      type: UPDATE_ITEM,
      payload: product,
    });
  };

  const deleteCartProduct = (productId) => {
    dispatch({
      type: DELETE_ITEM,
      payload: productId,
    });
  };

  const resetCart = () => {
    dispatch({
      type: RESET_CART,
    });
  };

  const resetImageUploads = () => {
    dispatch({
      type: RESET_IMAGE_UPLOADS,
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        cartItems: state.cartItems,
        mainImageDisplay: state.mainImageDisplay,
        uploadedImages: state.uploadedImages,
        addProduct,
        fetchProducts,
        updateProduct,
        deleteProductFormDB,
        addProductToCart,
        updateCartProduct,
        deleteCartProduct,
        resetCart,
        uploadProductImages,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsState;
