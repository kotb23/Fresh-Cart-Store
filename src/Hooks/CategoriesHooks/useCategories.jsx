import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategories(categoryId = null) {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  async function getCategory(categoryId) {
    if (!categoryId) {
      return;
    } else {
      return await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
      );
    }
  }

  let allCategories = useQuery({
    queryKey: ["allCategories"],
    queryFn: () => getCategories(),
    staleTime: Infinity,
    retry: 2,
    retryDelay: 3000,
    refetchInterval: Infinity,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    gcTime: 25000,
  });

  let categoryDetails = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 30000,
    retry: 5,
    retryDelay: 3000,
    refetchInterval: 20000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    gcTime: 25000,
  });

  return { allCategories, categoryDetails };
}
