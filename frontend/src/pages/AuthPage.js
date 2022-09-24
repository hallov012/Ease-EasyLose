import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/userInfoSlice";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { instance, createHeaders } from "../api/index";

function AuthPage() {
  const location = useLocation();
  const history = useHistory();
  const tokens = location.search
    .replace("?accessToken=", "")
    .replace("refreshToken=", "")
    .split("&");
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.UserInfo.accessToken);
  useEffect(() => {
    dispatch(register(tokens));
  }, []);

  useEffect(() => {
    console.log(`accessToken: ${accessToken}`);
    if (accessToken) {
      instance
        .get("https://j7a704.p.ssafy.io/api/v1/user", {
          headers: createHeaders(accessToken),
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  }, [accessToken]);

  return <div></div>;
}

export default AuthPage;
