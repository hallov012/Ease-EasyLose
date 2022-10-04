import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PlanNav from "../PlanNav/PlanNav";
import NutrientSummary from "../../../components/MainPage/NutrientSummary/NutrientSummary";
import SumProgressBar from "../../../components/MainPage/SumProgressBar/SumProgressBar";
import MealCardList from "../../../components/MainPage/MealCardList/MealCardList";

import classes from "./PlanPage.module.css";
import { useHistory } from "react-router-dom";
import { registerPlanId } from "../../../store/planSlice";
import { registerTargetDate } from "../../../store/statusSlice";

function PlanDetailPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("target_date"));
    if (temp) {
      if (typeof temp === "number") {
        dispatch(registerPlanId(temp));
        dispatch(registerTargetDate(temp));
      }
    } else {
      history.push("/plan");
    }
  }, []);

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
            <PlanNav title={dailyMeal[0].name} planId={planId} />
          </div>
          <div style={{ margin: "10vh 5%" }}>
            <NutrientSummary
              userInfo={userInfo}
              userDailyDiet={dailyMeal}
              path={`/plan/${planId}`}
            />
            <SumProgressBar userDailyDiet={dailyMeal} />
            <MealCardList
              userInfo={userInfo}
              userDailyDiet={dailyMeal}
              path={`/plan/${planId}`}
            />
          </div>
        </div>
      ) : null}
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <NavLink
          to={`/plan/${planId}/report`}
          className={`${classes.report_btn} box_shadow`}
        >
          <i class="fa-solid fa-square-poll-vertical"></i>
          <p>REPORT</p>
        </NavLink>
      </div>
    </div>
  );
}
export default PlanDetailPage;
