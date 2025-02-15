import React from "react";
import errImg from "../../assets/error.svg";

export default function Notfound() {
  return (
    <>
      <figure className="mx-auto mt-8 flex w-[70%] flex-col items-center justify-center">
        <h1 className="text-3xl font-[600]">Page Not Found</h1>
        <img className="w-fit" src={errImg} alt="Error Not Found" />
      </figure>
    </>
  );
}
