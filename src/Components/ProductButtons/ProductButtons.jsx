export default function ProductButtons ({ 
  product, 
  AddToCart, 
  loading, 
  currentIdBtn, 
  handleWishListToggle, 
  loadingWish, 
  wishlistdetails 
}) {
  return (
<div className="flex items-center justify-center p-3 pe-3">
      <button
        onClick={() => AddToCart(product.id)}
        className="btn-add-product-sm md:btn-add-product my-2"
      >
        {loading && currentIdBtn === product.id ? (
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
        ) : wishlistdetails?.some(item => item.id === product.id) ? (
          <i className="fa-solid fa-heart fa-xl md:fa-2xl cursor-pointer text-emerald-600"></i>
        ) : (
          <i className="fa-regular fa-heart fa-xl md:fa-2xl cursor-pointer"></i>
        )}
      </button>
    </div>
);
};

