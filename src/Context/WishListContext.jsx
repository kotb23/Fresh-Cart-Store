import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [numWishList, setNumWishList] = useState(0);
  const [wishlistdetails, setWishlistDetails] = useState(null);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToWishList(productId) {
    headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers },
      )
      .then((res) => {
        setNumWishList(res.data.count);
        return res;
      })
      .catch((err) => err);
  }

  function removeItemFromWishList(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => {
        setNumWishList(res.data.count);
        return res;
      })
      .catch((err) => err);
  }

  function getUserWishList() {
    headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => {
        setNumWishList(res.data.count);
        setWishlistDetails(res.data.data);
        return res;
      })
      .catch((err) => err);
  }
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserWishList();
    }
  }, [headers]);

  return (
    <WishListContext.Provider
      value={{
        addToWishList,
        getUserWishList,
        removeItemFromWishList,
        setNumWishList,
        numWishList,
        wishlistdetails,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
