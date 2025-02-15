import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numCart, setNumCart] = useState(0);
  const [cartId, setCartId] = useState(0);
 
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(productId) {
    headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers },
      )
      .then((res) => {
        setNumCart(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }

  function getUserCart() {
    headers = {
      token: localStorage.getItem("userToken"),
    };

    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setNumCart(res.data.numOfCartItems);
        setCartId(res.data.cartId);
        headers = {
          token: localStorage.getItem("userToken"),
        };
        return res;
      })
      .catch((err) => err);
  }

  function updateCartQuantity(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers },
      )
      .then((res) => {
        setNumCart(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }

  function removeItemFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => {
        setNumCart(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }

  function clearItemsFromCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {
        setNumCart(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserCart();
    }
  }, [headers]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getUserCart,
        updateCartQuantity,
        removeItemFromCart,
        setNumCart,
        numCart,
        cartId,
        clearItemsFromCart,
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
