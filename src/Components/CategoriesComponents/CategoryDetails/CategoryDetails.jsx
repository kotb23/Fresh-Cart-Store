import React from "react";
import { useParams } from "react-router-dom";
import useCategories from "../../../Hooks/CategoriesHooks/useCategories";
import LoadingAndErrorHandler from "../../LoadingAndErrorHandler/LoadingAndErrorHandler";

export default function CategoryDetails() {
  const { categoryId } = useParams();
  const { categoryDetails } = useCategories(categoryId);
  const { data, isError, isLoading, error } = categoryDetails;

  return (
    <LoadingAndErrorHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
    >
      <div className="p-6">
        <h2 className="mb-6 text-center text-3xl font-bold text-emerald-700">
          Subcategories
        </h2>
        <div className="mx-auto grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 md:grid-cols-3">
          {data?.data?.data.map((sub) => (
            <div
              key={sub._id}
              className="rounded-lg border border-gray-200 p-4 text-center shadow-md transition-transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-gray-800 md:text-2xl">
                {sub.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </LoadingAndErrorHandler>
  );
}
