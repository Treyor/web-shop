import { lazy, Suspense } from "react";

import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import ProductPage from "./pages/ProductPage";
import PurchaseList from "./pages/PurchaseList";
import EditProduct from "./EditProduct";
import NewCategory from "./newCategory";
import NewProduct from "./newProduct";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  SHOP_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  PRODUCT_ROUTE,
  ACCOUNT_ROUTE,
  PURCHASE_LIST_ROUTE,
  EDIT_PRODUCT_ROUTE,
  NEW_CATEGORY_ROUTE,
  NEW_PRODUCT_ROUTE
} from "./utils/consts";

import Loader from './Preloader'

const LazyLoadComponent = lazy(() => import("./pages/ProductPage"));

const SuspenseComponent = () => {
  return (
    <Suspense fallback={<Loader />}>
      <LazyLoadComponent />
    </Suspense>
  );
};

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: NEW_CATEGORY_ROUTE,
    Component: NewCategory,
  },
  {
    path: EDIT_PRODUCT_ROUTE + "/:id",
    Component: EditProduct,
  },
  {
    path: NEW_PRODUCT_ROUTE,
    Component: NewProduct
  },
];

export const authRoutes = [
  {
    path: ACCOUNT_ROUTE,
    Component: Account,
  },
  {
    path: PURCHASE_LIST_ROUTE,
    Component: PurchaseList,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    Component: SuspenseComponent,
  },
];
