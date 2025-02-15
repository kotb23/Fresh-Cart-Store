import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useAllProducts() {
  function getAllProducts() {
    let headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let productInfo = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
    staleTime: 30000,
    retry: 5,
    retryDelay: 3000,
    refetchInterval: 20000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    gcTime: 10000,
    select: (data) => data.data.data,
  });

  return productInfo;
}
