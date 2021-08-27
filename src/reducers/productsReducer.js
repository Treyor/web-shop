import { defaultState } from "../store";

const SET_PRODUCTS = "SET_PRODUCTS";
const SET_CATEGORIES = "SET_CATEGORIES";
const SET_CURRENT_CATEGORY = "SET_CURRENT_CATEGORY";
const SET_CURRENT_PRODUCT = "SET_CURRENT_PRODUCT";
const IS_FETCHING_DATA = "IS_FETCHING_DATA";
const UNSET_CURRENT_PRODUCT = "UNSET_CURRENT_PRODUCT";
const UPDATE_PRODUCTS_DATA = "UPDATE_PRODUCTS_DATA";
const REMOVE_CATEGORY = "REMOVE_CATEGORY";
const CHANGE_CATEGORY_TITLE = "CHANGE_CATEGORY_TITLE";
const SEARCH_FIELD = "SEARCH_FIELD";
const DELETE_ITEM = "DELETE_ITEM";
const RENAME_ITEM = "RENAME_ITEM";
const CREATE_NEW_PRODUCT = "CREATE_NEW_PRODUCT";
const CREATE_NEW_CATEGORY = "CREATE_NEW_CATEGORY";

export default function productsReducer(state = defaultState.products, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        items: action.payload,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_CURRENT_CATEGORY: {
      return {
        ...state,
        currentCategory: action.payload,
      };
    }
    case IS_FETCHING_DATA: {
      return {
        ...state,
        isFetching: action.payload,
      };
    }
    case SET_CURRENT_PRODUCT: {
      return {
        ...state,
        currentProduct: action.payload,
      };
    }
    case SEARCH_FIELD:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case UNSET_CURRENT_PRODUCT: {
      return {
        ...state,
        currentProduct: action.payload,
      };
    }
    case UPDATE_PRODUCTS_DATA: {
      return {
        ...state,
        items: state.items.map((item) => {
          if (action.payload.id === item.id) {
            return {
              id: action.payload.id,
              title: action.payload.title,
              price: action.payload.price,
              description: action.payload.description,
              category: action.payload.category,
              image: action.payload.image,
            };
          } else {
            return {
              ...item,
            };
          }
        }),
      };
    }
    case CHANGE_CATEGORY_TITLE:
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (action.payload.id === item.id) {
            return {
              ...item,
              amount: action.payload.title,
            };
          } else {
            return {
              ...item,
            };
          }
        }),
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories.filter((item) => item.id !== action.payload)],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: [...state.items.filter((item) => item.id !== action.payload)],
      };
    case RENAME_ITEM:
      return {
        ...state,
        categories: state.categories.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              title: action.payload.title,
            };
          } else {
            return {
              ...item,
            };
          }
        }),
      };
    case CREATE_NEW_PRODUCT: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case CREATE_NEW_CATEGORY: {
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    }
    default:
      return state;
  }
}

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});
export const isFetchingData = (bool) => ({
  type: IS_FETCHING_DATA,
  payload: bool,
});
export const setCurrentCategory = (category) => ({
  type: SET_CURRENT_CATEGORY,
  payload: category,
});
export const setCurrentProduct = (product) => ({
  type: SET_CURRENT_PRODUCT,
  payload: product,
});
export const unsetCurrentProduct = () => ({
  type: UNSET_CURRENT_PRODUCT,
  payload: "",
});
export const updateProductsData = (item) => {
  return {
    type: UPDATE_PRODUCTS_DATA,
    payload: item,
  };
};
export const removeCategory = (id) => {
  return { type: REMOVE_CATEGORY, payload: id };
};
export const setAmount = (item) => ({
  type: CHANGE_CATEGORY_TITLE,
  payload: item,
});
export const searchField = (searchQuery) => {
  return { type: SEARCH_FIELD, payload: searchQuery };
};
export const deleteItem = (id) => {
  return { type: DELETE_ITEM, payload: id };
};
export const renameItem = (item) => {
  return { type: RENAME_ITEM, payload: item };
};
export const createNewProduct = (item) => {
  return { type: CREATE_NEW_PRODUCT, payload: item };
};
export const createNewCategory = (item) => {
  return { type: CREATE_NEW_CATEGORY, payload: item };
};
