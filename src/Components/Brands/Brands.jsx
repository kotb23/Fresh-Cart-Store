import React, { useState } from "react";
import useBrands from "../../Hooks/useBrands";
import LoadingAndErrorHandler from "../LoadingAndErrorHandler/LoadingAndErrorHandler";

export default function Brands() {
  const { data, isError, isLoading, error } = useBrands();
  const [selectedBrand, setSelectedBrand] = useState(null);
  return (
    <LoadingAndErrorHandler isLoading={isLoading} isError={isError} error={error}>
      <>
        <div className="mt-18 grid grid-cols-2 justify-items-center gap-x-4 gap-y-12 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {data?.map((brand) => (
            <div key={brand._id} className="group col-span-1 px-5">
              <div 
                className="productBorder my-main-hover overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                onClick={() => setSelectedBrand(brand)}
              >
                <figure className="overflow-hidden">
                  <img
                    className="h-auto w-full object-cover"
                    src={brand.image}
                    alt={brand.name || "Brand Logo"}
                  />
                </figure>
              </div>
            </div>
          ))}
        </div>

        {selectedBrand && (
          <div className="fixed z-9999 inset-0 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-sm  md:max-w-lg bg-white rounded-lg shadow-xl">
              <div className="flex items-center justify-between p-4">
                <h3 className="text-xl font-semibold">{selectedBrand.name}</h3>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 p-2 rounded-lg"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="p-4">
                <img
                  className="h-auto w-full object-cover rounded-lg"
                  src={selectedBrand.image}
                  alt={selectedBrand.name || "Brand Logo"}
                />
              </div>
            </div>
          </div>
        )}
      </>
    </LoadingAndErrorHandler>
  );
}
