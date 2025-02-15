import React from "react";
import errImg from "../../assets/error.svg";

export default function LoadingAndErrorHandler({
  isLoading,
  isError,
  error,
  children,
}) {
  if (isError) {
    return (
      <figure className="mx-auto mt-8 flex w-[70%] flex-col items-center justify-center">
        <h3 className="my-12 text-center text-2xl font-bold text-red-600">
          {error?.message || "Something went wrong!"}
        </h3>
        <img className="w-fit" src={errImg} alt="Error Not Found" />
      </figure>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-18 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return children;
}
