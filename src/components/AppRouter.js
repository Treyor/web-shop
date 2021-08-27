import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { authRoutes, publicRoutes, adminRoutes } from "./routes";
import { SHOP_ROUTE } from "./utils/consts";
import { useSelector } from "react-redux";


const AppRouter = () => {

  const isAuth = useSelector((state) => state.auth.currentUser.isAuth);
  const isAdmin = useSelector((state) => state.auth.currentUser.accountType);

  return (
      <Switch>
      {isAuth && isAdmin === "administrator" &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}

      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={`${SHOP_ROUTE}`} />
    </Switch>
  )
};

export default AppRouter;
