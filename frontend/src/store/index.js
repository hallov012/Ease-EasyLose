import { createStore } from "redux";

function reducer(state = { accessToken: null }, action) {
  switch (action.type) {
    case "REGISTER":
      return { accessToken: action.payload };
    case "DEREGISTER":
      return { accessToken: null };
    default:
      return state;
  }
}

const store = createStore(reducer);

export { store };
