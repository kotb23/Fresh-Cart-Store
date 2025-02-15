import React, { useContext } from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";
import { authContext } from "../../Context/AuthContext";

export default function Layout() {
  let {userToken} = useContext(authContext);
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex-grow px-8 py-26 md:py-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}