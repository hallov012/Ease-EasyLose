import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { registerAccessToken, registerUserInfo } from "../store/userSlice"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"

function AuthPage() {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const tokens = location.search
    .replace("?accessToken=", "")
    .replace("refreshToken=", "")
    .split("&")

  useEffect(() => {
    localStorage.setItem(
      "tokens",
      JSON.stringify({ accessToken: tokens[0], refreshToken: tokens[1] })
    )
    dispatch(registerAccessToken(tokens))
  }, [])

  const accessToken = useSelector((state) => state.user.accessToken)
  const userInfo = useSelector((state) => state.user.userInfo)

  useEffect(() => {
    if (accessToken) {
      axios
        .get(`https://j7a704.p.ssafy.io/api/v1/user`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          dispatch(registerUserInfo(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [accessToken, dispatch])

  useEffect(() => {
    if (userInfo) {
      if (userInfo.goal) {
        history.push("/main")
      } else {
        history.push("/signup/gender")
      }
    }
  }, [userInfo, dispatch, history])

  return <div></div>
}

export default AuthPage
