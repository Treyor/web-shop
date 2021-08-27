import { defaultState } from "../store";

const SET_CURRENT_USER = "SET_CURRENT_USER";
const ADD_OFFER_TO_HISTORY = "ADD_OFFER_TO_HISTORY";
const UPDATE_ACCOUNT_DATA = "UPDATE_ACCOUNT_DATA"

export default function loginReducer(state = defaultState.auth, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ADD_OFFER_TO_HISTORY:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          purchaseHistory: [
            ...state.currentUser.purchaseHistory, action.payload
          ],
        },
      };
      case UPDATE_ACCOUNT_DATA:
        return {
          ...state,
          currentUser: action.payload
        }
    default:
      return state;
  }
}

export const setCurrentUser = (auth) => ({
  type: SET_CURRENT_USER,
  payload: auth,
});
export const addOfferToHistory = (offer) => {
  return (
    {
      type: ADD_OFFER_TO_HISTORY,
      payload: offer,
    }
  )
  };
export const updateAccountData = (data) => ({
  type: UPDATE_ACCOUNT_DATA,
  payload: data
})
