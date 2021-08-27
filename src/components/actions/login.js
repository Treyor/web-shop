import { addOfferToHistory } from "../../reducers/loginReducer";
import { updateAccountData } from "../../reducers/loginReducer";

const url = `http://localhost:3001/users`;

export const getUser = async (email, password) => {
  let data;
  const response = await fetch(`${url}?email=${email}`);
  if (response.status >= 200 && response.status < 300) {
    data = response.json();
    if (data.password === password) {
      return data;
    }
  } else {
    throw new Error("Could not fetch data");
  }
};

export const registerUser = async (data) => {
  fetch(`http://localhost:3001/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const changeAccountData = (info) => {
  return async (dispatch) => {
    await fetch(`http://localhost:3001/users/${info.id}`, {
      method: "PATCH",
      body: JSON.stringify({ ...info }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => dispatch(updateAccountData(res)));
  };
};

export const addToPurchaseHistory = (id, oldData, newData) => {
  return async (dispatch) => {
    await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ purchaseHistory: [oldData, ...newData] }),
    })
      .then(() => dispatch(addOfferToHistory(oldData)));
  };
};
