import React, { createContext, useContext } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import toast from "react-hot-toast";
export const ordersContext = createContext();

export default function OrdersContextProvider({ children }) {
  let { setNumCart, cartId } = useContext(CartContext);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function checkoutCart(cartId, url, formData) {
    headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formData,
        },
        {
          headers,
        },
      )
      .then((res) => {
        setNumCart(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }

  function cashOrderCart(cartId, formData) {
    headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: formData,
        },
        {
          headers,
        },
      )
      .then((res) => {
        toast.success(res.data.status);
        setNumCart(0);
        return res;
      })
      .catch((err) => err);
  }

  return (
    <ordersContext.Provider value={{ checkoutCart, cashOrderCart }}>
      {children}
    </ordersContext.Provider>
  );
}
