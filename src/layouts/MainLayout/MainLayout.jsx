import React, { Children } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div>
      {children}
      <Outlet />
    </div>
  );
}
