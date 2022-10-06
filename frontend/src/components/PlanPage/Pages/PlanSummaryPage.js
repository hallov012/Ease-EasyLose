import TopHistoryNav from "../../TopNav/TopHistoryNav";
import NutrientChart from "../../MainPage/NutrientChart/NutrientChart";
import NutrientProgressGraph from "../../MainPage/NutrientProgressGraph/NutrientProgressGraph";
import NutrientProgressBox from "../../MainPage/NutrientProgressBox/NutrientProgressBox";
import UserInfoBox from "../../MainPage/UserInfoBox/UserInfoBox";

import classes from "./PlanPage.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { registerPlanId } from "../../../store/planSlice";

function PlanSummaryPage({ colorSet }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const temp = JSON.parse(localStorage.getItem("target_date"));
  if (temp) {
    if (typeof temp === "number") {
      dispatch(registerPlanId(temp));
    }
  } else {
    history.push("/plan");
  }

  const userInfo = useSelector((state) => state.user.userInfo);
  const planId = useSelector((state) => state.plan.planId);
  const dailyMealList = useSelector((state) => state.plan.dailyMealList);
  const [dailyMeal, setDailyMeal] = useState([]);
  function isPlan(element) {
    if (element.id === planId) {
      return true;
    }
  }
  useEffect(() => {
    if (planId && dailyMealList.length) {
      setDailyMeal(dailyMealList.filter(isPlan));
    }
  }, [planId, dailyMealList]);

  return (
    <div className={classes.plan_page}>
      {dailyMeal.length ? (
        <div>
          <div id="top_nav_area">
            <TopHistoryNav text={`${dailyMeal[0].name}`} />
          </div>
          <div
            style={{
              margin: "11vh 5% 15vh",
            }}
          >
            <UserInfoBox userInfo={userInfo} />
            <NutrientChart dietSum={dailyMeal[0].total} colorSet={colorSet} />
            <NutrientProgressGraph
              userInfo={userInfo}
              dietSum={dailyMeal[0].total}
              colorSet={colorSet}
            />
            <NutrientProgressBox
              userInfo={userInfo}
              dietSum={dailyMeal[0].total}
              colorSet={colorSet}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default PlanSummaryPage;
