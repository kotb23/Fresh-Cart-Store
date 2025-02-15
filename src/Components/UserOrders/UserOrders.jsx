import React from "react";
import useUserOrders from "../../Hooks/useUserOrders";
import LoadingAndErrorHandler from "../LoadingAndErrorHandler/LoadingAndErrorHandler";

export default function UserOrders() {
  let { data: orders, isLoading, isError, error } = useUserOrders();

  if (isLoading || !orders) {
    return (
      <LoadingAndErrorHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    );
  }

  if (orders.length === 0) {
    return <div className="text-center text-gray-500">No orders found.</div>;
  }

  return (
    <div className="p-4 ">
      <h1 className="mb-4 text-2xl font-bold text-center">Your Orders</h1>
      <div className="flex flex-col-reverse">
        {orders?.map((order) => (
          <div key={order._id} className="rounded-lg border p-4 shadow-sm my-3">
            <div className="mb-4 flex md:flex-row flex-col items-center justify-between">
              <div>
                <p className="font-semibold">Order ID: {order._id}</p>
                <p className="text-sm text-gray-500">
                  Placed on:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-EG")}
                </p>
              </div>
              <div className="pt-3 md:pt-0">
                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    order.isPaid
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-4">
              <h2 className="mb-2 text-lg font-[700]">Shipping Address</h2>
              <p>
                {" "}
                <span className="font-[600]">details: </span>{" "}
                {order.shippingAddress.details}
              </p>
              <p>
                {" "}
                <span className="font-[600]">city: </span>{" "}
                {order.shippingAddress.city}
              </p>
              <p>
                {" "}
                <span className="font-[600]">Phone: </span>{" "}
                {order.shippingAddress.phone}
              </p>
            </div>

            {/* Cart Items */}
            <div className="mb-4">
              <h2 className="mb-2 font-[600]">Items</h2>
              <div className="space-y-2">
                {order.cartItems.map((item) => (
                  <div key={item._id} className="flex items-center">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="mr-4 h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-[500]">{item.product.title}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.count}
                      </p>
                      <p className="text-sm">{item.price.toFixed(2)} EGP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4">
              <h2 className="mb-2 font-[600]">Order Summary</h2>
              <div className="flex justify-between">
                <p className="font[700] text-xl">Total:</p>
                <p className="font[700] text-xl">
                  {" "}
                  {order.totalOrderPrice.toFixed(2)} EGP
                </p>
              </div>
              <div className="flex justify-between">
                <p>Tax:</p>
                <p>{order.taxPrice.toFixed(2)} EGP</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping:</p>
                <p>{order.shippingPrice.toFixed(2)} EGP</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
