import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { registerAccessToken, registerUserInfo } from "../store/userSlice"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import { instance } from "../api/index"

function AuthPage() {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const tokens = location.search
    .replace("?accessToken=", "")
    .replace("refreshToken=", "")
    .split("&")

  localStorage.setItem("accessToken", tokens[0])
  localStorage.setItem("refreshToken", tokens[1])

  instance
    .get("/user", {})
    .then((response) => {
      dispatch(registerUserInfo(response.data))
      if (response.data.goal) {
        history.push("/main")
      } else {
        history.push("/signup/gender")
      }
    })
    .catch((error) => console.log(error))

  // localStorage.setItem(
  //   "tokens",
  //   JSON.stringify({ accessToken: tokens[0], refreshToken: tokens[1] })
  // )
  // useEffect(() => {
  //   dispatch(registerAccessToken(tokens))
  //   axios
  //     .get(`https://j7a704.p.ssafy.io/api/v1/user`, {
  //       headers: { Authorization: `Bearer ${tokens[0]}` },
  //     })
  //     .then((response) => {
  //       dispatch(registerUserInfo(response.data))
  //       if (response.data.goal) {
  //         history.push("/main")
  //       } else {
  //         history.push("/signup/gender")
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }, [])

  return <div></div>
}

export default AuthPage
