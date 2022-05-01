import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Route,
  Navigate,
  RouteProps,
  Routes,
  useNavigate,
} from "react-router-dom";

//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface MyRouteProps extends RouteProps {
  component: any;
  rest?: any;
}

const PrivateRoute: React.FC<MyRouteProps> = ({
  component: Component,
  ...rest
}: any) => {
  const { isAuthenticated } = useAppSelector((state) => state.customer);
  const navigate = useNavigate();

  const render = () => {
    console.log(isAuthenticated);
    if (isAuthenticated) return <Component />;
    else navigate("/login");
  };

  return <>{render()}</>;
};

export default PrivateRoute;

//{isAuthenticated ? <Component /> : <Navigate to='/login' />}
