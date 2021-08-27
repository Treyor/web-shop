import {
  setProducts,
  setCategories,
  setCurrentProduct,
  removeCategory,
  createNewProduct,
  deleteItem
} from "../../reducers/productsReducer";
import { updateProductsData } from "../../reducers/productsReducer";

const url = `http://localhost:3001`;

export const getProducts = () => {
  return async (dispatch) => {
    await fetch(`${url}/products`)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        dispatch(setProducts(data));
      });
  };
};

export const addNewProduct = (data) => {
  return async (dispatch) => {
    await fetch(`${url}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((res) => dispatch(createNewProduct(res)));
  };
};

export const getCurrentItem = (id) => {
  return async (dispatch) => {
    await fetch(`${url}/products/${id}`)
      .then((data) => data.json())
      .then((data) => dispatch(setCurrentProduct(data)));
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    await fetch(`${url}/categories`)
      .then((data) => data.json())
      .then((data) => dispatch(setCategories(data)));
  };
};

export const changeProductInfo = (id, data) => {
  return async (dispatch) => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
    })
      .then((data) => data.json())
      .then((res) => dispatch(updateProductsData(res)));
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    await fetch(`${url}/categories/${id}`, {
      method: "DELETE",
    }).then(() => dispatch(removeCategory(id)))
  };
};

export const deleteProduct = (id) => {
  return async dispatch => {
    await fetch(`${url}/products/${id}`, {
      method: "DELETE",
    }).then(() => dispatch(deleteItem(id)))
  }

};
