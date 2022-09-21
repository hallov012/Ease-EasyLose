import "./App.css";

import { Route, Switch, useLocation } from "react-router-dom";
import { useEffect } from "react";
import CalendarPage from "./pages/CalendarPage";
import PlanPage from "./pages/PlanPage";
import MainPage from "./pages/MainPage";
import ChartPage from "./pages/ChartPage";
import MyPage from "./pages/MyPage";
import SignUpPage from "./pages/SignUpPage";
import StartPage from "./pages/StartPage";
import AuthPage from "./pages/AuthPage";
import AddPage from "./pages/AddPage";

import BottomNav from "./components/BottomNav/BottomNav";

import { useState } from "react";

function App() {
  const location = useLocation().pathname;

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
      );
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
        <Route path="/add/:typeName">
          <AddPage></AddPage>
        </Route>
        <Route path="/auth/:tokenInfo">
          <AuthPage></AuthPage>
        </Route>
      </Switch>
      {renderBottomNav()}
    </div>
  );
}

export default App;
