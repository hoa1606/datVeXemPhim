import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { PATH } from '../../routes/path';

export default function AuthLayout({ children }) {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser) {
    if (currentUser.maLoaiNguoiDung === 'QuanTri') {
      return <Navigate to={PATH.ADMIN} />;
    } else {
      return <Navigate to={PATH.HOME} />;
    }
  }


  return (
    <div className="flex w-4/5 mx-auto  h-screen">
      {/* Hình ảnh bên trái */}
      <div className="w-1/2 bg-red-500 bg-cover bg-center"></div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        {children}
        <Outlet />
      </div>
    </div>
  );
}