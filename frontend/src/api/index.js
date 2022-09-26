// import axios from "axios";
// import { store } from "../store/index.js";

// // const accessToken = useSelector((state) => state.user.accessToken);
// axios.defaults.baseURL = "https://j7a704.p.ssafy.io/api/v1";

// function listener() {
//   let state = store.getState();
//   console.log(`${state.accessToken} registered in axios`);
//   axios.defaults.headers.common[
//     "Authorization"
//   ] = `Bearer ${state.accessToken}`;
// }

// store.subscribe(listener);

// const instance = axios.create({
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export { instance };

// const instance = axios.create({
//   baseURL: "https://j7a704.p.ssafy.io/api/v1",

//   // baseURL: "https://i7a407.p.ssafy.io/api",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${accessToken}`,
//   },
// });

// export { instance };
