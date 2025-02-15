import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useUserOrders() {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function checkToken() {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyToken`,
      { headers },
    );
    return response.data.decoded.id;
  }

  async function getUserOrders(ownerId) {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${ownerId}`,
    );
    return response.data;
  }

  const {
    data: ownerId,
    isLoading: isOwnerLoading,
    error: ownerError,
  } = useQuery({
    queryKey: ["ownerId"],
    queryFn: checkToken,
    staleTime: Infinity,
    retry: 3,
    retryDelay: 3000,
  });

  const ordersQuery = useQuery({
    queryKey: ["userOrders", ownerId],
    queryFn: () => getUserOrders(ownerId),
    enabled: !!ownerId,
    staleTime: Infinity,
    retry: 3,
    retryDelay: 3000,
    refetchOnWindowFocus: true,
  });

  return ordersQuery;
}
