import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import { Link } from 'react-router-dom';

export default function WishList() {
  let { getUserWishList, removeItemFromWishList } = useContext(WishListContext);
  let { addToCart } = useContext(CartContext);
  const [wishlistdetails, setWishlistDetails] = useState(null);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [currentIdQty, setCurrentIdQty] = useState("");
  const [currentIdBtn, setCurrentIdBtn] = useState("");
  const [loading, setLoading] = useState(false);

  async function GetUserWishList() {
    setLoadingWishlist(true);
    let response = await getUserWishList();
    if (response.data.status == "success") {
      setWishlistDetails(response.data.data);
      setLoadingWishlist(false);      
    } else {
      setLoadingWishlist(false);
    }
  }

  async function RemoveItemFromWishList(id) {
    setCurrentIdQty(id);
    setLoadingRemove(true);
    let response = await removeItemFromWishList(id);
    if (response.data.status == "success") {
      toast.success(response.data.message);
      setWishlistDetails((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== id),
      );
      setLoadingRemove(false);
    } else {
      toast.error("Something wronge");
      setLoadingRemove(false);
    }
  }

  async function AddToCart(id) {
    setCurrentIdBtn(id);
    setLoading(true);
    let response = await addToCart(id);
    if (response?.data?.status == "success") {
      toast.success(response.data.message, {
        duration: 2000,
        position: "top-center",
      });
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    GetUserWishList();
  }, []);

  return (
    <>
      {loadingWishlist ? (
        <div className="mt-18 flex items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : wishlistdetails?.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
            <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-4">
                  Image
                </th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-4">
                  Product
                </th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-4">
                  Price
                </th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlistdetails?.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-200 bg-white hover:bg-gray-50"
                >
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    <img
                      src={product.imageCover}
                      className="h-16 w-16 object-cover md:h-24 md:w-24"
                      alt={product.title}
                    />
                  </td>

                  <td className="px-4 py-2 font-semibold text-gray-900 md:px-6 md:py-4">
                    <Link
                      to={`/productdetails/${product._id}/${product.category.name}`}
                    >
                      <span className="hover:underline">{product.title}</span>
                    </Link>
                  </td>

                  <td className="px-4 py-2 font-semibold text-gray-900 md:px-6 md:py-4">
                    EGP {product.price}
                  </td>

                  <td className="px-4 py-2 md:px-6 md:py-4">
                    <div className="flex flex-col gap-2">
                      
                      <button
                        className="cursor-pointer font-medium text-emerald-600 hover:underline"
                        onClick={() => AddToCart(product.id)}
                      >
                        {loading && currentIdBtn == product.id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <span>Add to cart</span>
                        )}
                      </button>

                      <button
                        className="cursor-pointer font-medium text-red-600 hover:underline"
                        onClick={() => RemoveItemFromWishList(product.id)}
                      >
                        {loadingRemove && currentIdQty == product.id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <span>Remove</span>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-center rounded bg-emerald-600 bg-linear-to-r to-emerald-500 to-45% p-8">
          <h2 className="text-2xl font-[600] text-white">
            Your Wishlist is empty
          </h2>
        </div>
      )}
    </>
  );
}
