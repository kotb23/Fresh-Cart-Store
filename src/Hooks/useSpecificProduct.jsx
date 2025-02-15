import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

export default function useSpecificProduct() {
  let { id } = useParams();

  function getProduct(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let specificProduct = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    staleTime: 30000,
    retry: 5,
    retryDelay: 3000,
    refetchInterval: 20000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    gcTime: 20000,
    select: (productData) => productData.data.data,
  });

  return specificProduct;
}
