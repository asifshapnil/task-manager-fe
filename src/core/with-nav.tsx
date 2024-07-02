import { FC, ReactNode } from "react";
import { Outlet } from "react-router";
import NavbarComponent from "./navbar/navbar.component";

const WithNav = () => {
  return (
    <>
      <NavbarComponent></NavbarComponent>
      <Outlet />
    </>
  );
};

export default WithNav;
