import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useCategoriesSllider() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let categoriesSlider = useQuery({
    queryKey: ["allCategories"],
    queryFn: getCategories,
    staleTime: Infinity,
    retry: 5,
    retryDelay: 2000,
    refetchInterval: Infinity,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    gcTime: 10000,
  });
  return categoriesSlider;
}
