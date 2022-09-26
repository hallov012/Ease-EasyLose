import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAccessToken } from "../store/userSlice";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { instance } from "../api/index";
import axios from "axios";

function AuthPage() {
  const location = useLocation();
  const history = useHistory();
  const tokens = location.search
    .replace("?accessToken=", "")
    .replace("refreshToken=", "")
    .split("&");
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);

  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    dispatch(registerAccessToken(tokens));
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios
        .get(`https://j7a704.p.ssafy.io/api/v1/user`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      // instance
      //   .get("/user", {})
      //   .then((response) => {
      //     setUserInfo(response.data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  }, [accessToken]);

  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      if (userInfo.goal) {
        history.push("/main");
      } else {
        history.push("/signup/gender");
      }
    }
  }, [userInfo]);

  return <div></div>;
}

export default AuthPage;
