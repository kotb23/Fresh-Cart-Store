import React from "react";
import { Link } from "react-router-dom";
import useCategories from "../../../Hooks/CategoriesHooks/useCategories";
import LoadingAndErrorHandler from "../../LoadingAndErrorHandler/LoadingAndErrorHandler";

export default function Categories() {
  const { allCategories } = useCategories();
  const { data, isError, isLoading, error } = allCategories;

  return (
    <LoadingAndErrorHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    >
      <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-9">
        <div className="col-span-12 md:col-span-12 md:col-start-1 md:col-end-12 lg:col-span-12 lg:col-start-1 lg:col-end-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:gap-9 xl:grid-cols-4">
            {data?.data?.data.map((category) => (
              <div
                key={category._id}
                className="group my-main-hover rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:scale-105"
              >
                <Link to={`/category/${category._id}`}>
                  <img
                    className="h-[200px] w-full rounded-t-lg object-cover sm:h-[250px] md:h-[300px] lg:h-[350px]"
                    src={category.image}
                    alt={category.name}
                  />
                </Link>
                <div className="p-4 transition-all duration-500 group-hover:scale-105 sm:p-5">
                  <Link to={`/category/${category._id}`}>
                    <h5 className="mb-2 text-center text-xl font-bold tracking-tight text-emerald-700 transition-all duration-500 hover:text-emerald-500">
                      {category.name}
                    </h5>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LoadingAndErrorHandler>
  );
}
