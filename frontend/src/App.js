import "./App.css";

import { Route, Switch, Redirect } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import MockMealPage from "./pages/MockMealPage";
import MainPage from "./pages/MainPage";
import ChartPage from "./pages/ChartPage";
import MyPage from "./pages/MyPage";
import SignUpPage from "./pages/SignUpPage";
import StartPage from "./pages/StartPage";

import BottomNav from "./components/BottomNav/BottomNav";

import { useState } from "react";

function App() {
  const [authorized, setAuthorized] = useState(true);
  return (
    <div className="App">
      <div className="top_line_gradient"></div>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/startpage"></Redirect>
        </Route>
        <Route path="/startpage">
          <StartPage></StartPage>
        </Route>
        <Route path="/signuppage">
          <SignUpPage></SignUpPage>
        </Route>
        <Route path="/calendarpage">
          <CalendarPage></CalendarPage>
        </Route>
        <Route path="/mockmealpage">
          <MockMealPage></MockMealPage>
        </Route>
        <Route path="/mainpage">
          <MainPage></MainPage>
        </Route>
        <Route path="/chartpage">
          <ChartPage></ChartPage>
        </Route>
        <Route path="/mypage">
          <MyPage></MyPage>
        </Route>
      </Switch>
      {authorized ? (
        <div id="bottom_nav_area">
          <BottomNav />
        </div>
      ) : null}
    </div>
  );
}

export default App;
