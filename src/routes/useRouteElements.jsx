import React from "react";
import { useRoutes } from "react-router-dom";

import { PATH } from './path'
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import MainLayout from "../layouts/MainLayout/MainLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import LoginPage from "../modules/auth/Login/LoginPage";
import RegisterPage from "../modules/auth/Register/RegisterPage";
import HomePage from "../modules/home/HomePage/HomePage";
import UserManagementPage from "../modules/admin/UserManagerment/UserManagermentPage";
import MovieManagementPage from "../modules/admin/MovieManagerment/MovieManagermentPage";

export default function useRouteElements() {
  const elements = useRoutes([
    // auth
    {
      path: PATH.AUTH,
      element: <AuthLayout />,
      children: [
        {
          path: PATH.LOGIN,
          element: <LoginPage />
        },
        {
          path: PATH.REGISTER,
          element: <RegisterPage />
        },
      ],
    },

    // user
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: '/about',
          element: <div>About</div>,
        },
      ],
    },

    //admin
    {
      path: PATH.ADMIN,
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <div>Admin Overview</div>,
        },
        {
          path: PATH.USER_MANAGERMENT,
          element: <UserManagementPage />,
        },
        {
          path: PATH.MOVIE_MANAGERMENT,
          element: <MovieManagementPage />,
        },
      ],
    },,

  ]);
  return elements;
}
