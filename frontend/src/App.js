import "./App.css"

import { Route, Switch, useHistory, useLocation } from "react-router-dom"
import { useEffect } from "react"
import CalendarPage from "./pages/CalendarPage"
import PlanPage from "./pages/PlanPage"
import MainPage from "./pages/MainPage"
import ChartPage from "./pages/ChartPage"
import MyPage from "./pages/MyPage"
import SignUpPage from "./pages/SignUpPage"
import StartPage from "./pages/StartPage"
import AuthPage from "./pages/AuthPage"
import AddPage from "./pages/AddPage"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

import BottomNav from "./components/BottomNav/BottomNav"
import { registerAccessToken, registerUserInfo } from "./store/userSlice"

function App() {
  const location = useLocation().pathname
  const tokens = JSON.parse(localStorage.getItem("tokens"))
  const dispatch = useDispatch()
  if (tokens && tokens.accessToken && tokens.refreshToken) {
    dispatch(registerAccessToken([tokens.accessToken, tokens.refreshToken]))
  }
  const accessToken = useSelector((state) => state.user.accessToken)
  const userInfo = useSelector((state) => state.user.userInfo)

  const history = useHistory()

  console.log(accessToken)

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
  }, [accessToken])

  useEffect(() => {
    if (userInfo) {
      if (userInfo.goal) {
        history.push("/main")
      } else {
        history.push("/signup/gender")
      }
    }
  }, [userInfo, dispatch, history])

  function renderBottomNav() {
    if (
      location.includes("main") ||
      location.includes("calendar") ||
      location.includes("plan") ||
      location.includes("chart") ||
      location.includes("mypage")
    )
      return (
        <div id="bottom_nav_area">
          <BottomNav />
        </div>
      )
  }

  return (
    <div className="App">
      <div className="top_line_gradient"></div>
      <Switch>
        <Route path="/" exact>
          <StartPage></StartPage>
        </Route>
        <Route path="/signup">
          <SignUpPage></SignUpPage>
        </Route>
        <Route path="/main">
          <MainPage></MainPage>
        </Route>
        <Route path="/calendar">
          <CalendarPage></CalendarPage>
        </Route>
        <Route path="/plan">
          <PlanPage></PlanPage>
        </Route>
        <Route path="/chart">
          <ChartPage></ChartPage>
        </Route>
        <Route path="/mypage">
          <MyPage></MyPage>
        </Route>
        <Route path="/add">
          <AddPage></AddPage>
        </Route>
        <Route path="/auth/:tokenInfo">
          <AuthPage></AuthPage>
        </Route>
      </Switch>
      {renderBottomNav()}
    </div>
  )
}

export default App
