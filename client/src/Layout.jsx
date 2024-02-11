import React from "react";
import NavbarComp from "./components/Nav/NavbarComp";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavbarComp />
      <Outlet />
    </>
  );
}

export default Layout;
