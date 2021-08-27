import { defaultState } from "../store";

const ADD_TO_CART = "ADD_TO_CART";
const SET_AMOUNT = "SET_AMOUNT";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

export default function productsReducer(state = defaultState.cart, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }
    case SET_AMOUNT:
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (action.payload.id === item.id) {
            return {
              ...item,
              amount: action.payload.amount,
            };
          } else {
            return {
              ...item,
            };
          }
        }),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
}

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: { ...item, amount: 1 },
});
export const setAmount = (item) => ({ type: SET_AMOUNT, payload: item });
export const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, payload: id });
export const clearCart = (item) => ({ type: CLEAR_CART, payload: item });
