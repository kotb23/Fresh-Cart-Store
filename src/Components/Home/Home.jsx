import React from "react";
import RecentProducts from "./../RecentProducts/RecentProducts";
import MainBanner from "../MainBanner/MainBanner";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";

export default function Home() {
  return (
    <>
      <MainBanner />
      <CategoriesSlider />
      <RecentProducts />
    </>
  );
}
