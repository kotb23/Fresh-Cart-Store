import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useBrands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let allBrands = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: Infinity,
    retry: 5,
    retryDelay: 3000,
    refetchInterval: Infinity,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    gcTime: 30000,
    select: (data) => data.data.data,
  });

  return allBrands;
}
