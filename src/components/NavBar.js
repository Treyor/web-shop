import React from "react";
import { Navbar, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Cart } from "react-bootstrap-icons";
import { useLocation } from "react-router";

import {
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  ACCOUNT_ROUTE,
  ADMIN_ROUTE,
} from "./utils/consts";
import { setCurrentUser } from "../reducers/loginReducer";

export const NavBar = () => {
  const dispatch = useDispatch();
  const currentUserAuth = useSelector((state) => state.auth.currentUser.isAuth);
  const isAdmin = useSelector((state) => state.auth.currentUser.accountType);
  const cart = useSelector((state) => state.cart.cart);
  let value = cart.reduce(function (previousValue, item) {
    return previousValue + item.amount * item.price;
  }, 0);

  const params = useLocation();

  return (
    <Navbar bg="dark" variant="dark">
      <NavLink to={SHOP_ROUTE}>На главную </NavLink>
      {currentUserAuth ? (
        <div className="d-flex ml-auto">
          {isAdmin ? (
            <Nav>
              <NavLink to={ADMIN_ROUTE}>
                <Button>Панель администратора</Button>
              </NavLink>
            </Nav>
          ) : (
            ""
          )}
          <Nav>
            <NavLink to={ACCOUNT_ROUTE}>
              <Button>Account</Button>
            </NavLink>
          </Nav>
          <Nav>
            <Button
              onClick={() => {
                dispatch(setCurrentUser(""));
              }}
            >
              Logout
            </Button>
          </Nav>
        </div>
      ) : (
        <Nav className="ml-auto">
          <NavLink to={LOGIN_ROUTE}>
            <Button>Login</Button>
          </NavLink>
        </Nav>
      )}
      {params.pathname !== "/basket" ? (
        <Nav>
          <NavLink to={BASKET_ROUTE}>
            <Button className="d-flex align-items-center w-100">
              <Cart />
              {cart.length > 0 ? value.toFixed(2) : "Empty"}
            </Button>
          </NavLink>
        </Nav>
      ) : (
        false
      )}
    </Navbar>
  );
};
