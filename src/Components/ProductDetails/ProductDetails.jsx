import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import useSpecificProduct from "../../Hooks/useSpecificProduct";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";
import useAllProducts from "../../Hooks/useAllProducts";

export default function ProductDetails() {
  let { id, category } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingWish, setLoadingWish] = useState(false);

  let { addToCart } = useContext(CartContext);
  let {
    addToWishList,
    wishlistdetails,
    getUserWishList,
    removeItemFromWishList,
  } = useContext(WishListContext);
  const [currentIdBtn, setCurrentIdBtn] = useState("");

  async function AddToCart(id) {
    setCurrentIdBtn(id);
    setLoading(true);
    let response = await addToCart(id);
    if (response.data.status == "success") {
      toast.success(response.data.message, {
        duration: 2000,
        position: "top-center",
      });
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
    setLoading(false);
  }

  async function handleWishListToggle(id) {
    setCurrentIdBtn(id);
    setLoadingWish(true);
    if (wishlistdetails?.some((item) => item.id === id)) {
      let response = await removeItemFromWishList(id);
      if (response?.data?.status === "success") {
        await getUserWishList();
        toast.success(response.data.message);
        setLoadingWish(false);
      }
    }
    if (!wishlistdetails?.some((item) => item.id === id)) {
      let response = await addToWishList(id);
      if (response?.data?.status === "success") {
        await getUserWishList();
        toast.success(response.data.message);
        setLoadingWish(false);
      }
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    autoplay: true,
    arrows: false,
  };

  let {
    data: productData,
    isLoading: productLoading,
    isError: productIsError,
    error: productError,
  } = useSpecificProduct();

  let {
    data: AllProductsData,
    isLoading: AllProductsLoading,
    isError: AllProductsIsError,
    error: AllProductsError,
  } = useAllProducts();

  const filteredProducts = AllProductsData?.filter(
    (product) => product.category.name === category && product.id !== id,
  );

  if (productIsError) {
    return (
      <h3 className="my-12 text-center text-4xl font-[600] text-red-600">
        {productError.message}
      </h3>
    );
  }

  if (productLoading) {
    return (
      <div className="mt-18 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  if (AllProductsIsError) {
    return (
      <h3 className="my-12 text-center text-4xl font-[600] text-red-600">
        {AllProductsError.message}
      </h3>
    );
  }

  if (AllProductsLoading) {
    return (
      <div className="mt-18 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-5 md:items-center">
        {/* col-span-6 col-start-4 */}
        <section className="col-span-4 md:col-span-3 md:col-start-2">
          <div>
            <figure>
              {productData?.images?.length > 1 ? (
                <Slider {...settings}>
                  {productData?.images.map((src) => (
                    <img
                      key={productData?.id}
                      src={src}
                      className="w-full"
                      alt=""
                    />
                  ))}
                </Slider>
              ) : (
                <img
                  key={productData?.id}
                  src={productData?.images}
                  className="w-full"
                  alt=""
                />
              )}
            </figure>
          </div>
        </section>

        <section className="col-span-8 md:col-span-6 md:col-start-5">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-[600] text-black">
              {productData?.title}
            </h3>
            <p className="text-gray-600">{productData?.description}</p>
            <h6 className="font-[400] text-emerald-600">
              {productData?.category.name}
            </h6>
            <div className="flex items-center justify-between">
              <span className="font-[500]">{productData?.price} EGP</span>
              <span className="flex items-center gap-0.5">
                {productData?.ratingsAverage}{" "}
                <FaStar className="text-yellow-400" />
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between p-3 pe-3">
            <button
              onClick={() => AddToCart(productData.id)}
              className="btn-specific-product"
            >
              {loading && currentIdBtn == productData.id ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                `Add To Cart`
              )}
            </button>

            <button
              onClick={() => handleWishListToggle(productData.id)}
              className="text-gray-500 transition-colors duration-300 hover:text-emerald-600"
            >
              {loadingWish && currentIdBtn === productData.id ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : wishlistdetails?.some(
                  (item) => item.id === productData.id,
                ) ? (
                <i className="fa-solid fa-heart fa-xl md:fa-2xl cursor-pointer text-emerald-600"></i>
              ) : (
                <i className="fa-regular fa-heart fa-xl md:fa-2xl cursor-pointer"></i>
              )}
            </button>
          </div>
        </section>

        <section className="col-span-12">
          <div className="mt-18 grid grid-cols-12 justify-items-center gap-x-4 gap-y-12">
            {filteredProducts?.map((product) => (
              <div
                key={product.id}
                className="group col-span-6 md:col-span-6 md:px-5 lg:col-span-3"
              >
                <div className="productBorder my-main-hover">
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <figure className="overflow-hidden">
                      <img
                        className="w-full object-cover"
                        src={product.imageCover}
                        alt=""
                      />
                    </figure>
                    <div className="p-2 md:p-5">
                      <h3 className="text-emerald-600">
                        {product.category.name}
                      </h3>
                      <h3>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                      <div className="flex items-center justify-between">
                        <span>{product.price} EGP</span>
                        <span className="flex items-center gap-0.5">
                          {product.ratingsAverage}{" "}
                          <FaStar className="text-yellow-400" />
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="flex items-center justify-center p-3 pe-3">
                    <button
                      onClick={() => AddToCart(product.id)}
                      className="btn-add-product-sm md:btn-add-product my-2"
                    >
                      {loading && currentIdBtn == product.id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        `Add To Cart`
                      )}
                    </button>

                    <button
                      onClick={() => handleWishListToggle(product.id)}
                      className="text-gray-500 transition-colors duration-300 hover:text-emerald-600"
                    >
                      {loadingWish && currentIdBtn === product.id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : wishlistdetails?.some(
                          (item) => item.id === product.id,
                        ) ? (
                        <i className="fa-solid fa-heart fa-xl md:fa-2xl cursor-pointer text-emerald-600"></i>
                      ) : (
                        <i className="fa-regular fa-heart fa-xl md:fa-2xl cursor-pointer"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
