import "./App.css"

import {
  Route,
  Switch,
  useHistory,
  useLocation,
  HashRouter,
} from "react-router-dom"
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
import { registerUserInfo } from "./store/userSlice"
import { instance } from "./api"
import { registerTargetDate } from "./store/statusSlice"

function App() {
  const location = useLocation().pathname
  const dispatch = useDispatch()

  const temp = JSON.parse(localStorage.getItem("target_date"))
  if (temp) {
    dispatch(registerTargetDate(JSON.stringify(temp)))
  } else {
    localStorage.setItem("target_date", JSON.stringify(new Date()))
    dispatch(registerTargetDate(JSON.stringify(new Date())))
  }

  useEffect(() => {
    instance
      .get("/user", {})
      .then((response) => {
        dispatch(registerUserInfo(response.data))
      })
      .catch((error) => console.log(error))
  }, [dispatch])

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
        <Route path="/mypage">
          <MyPage></MyPage>
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
