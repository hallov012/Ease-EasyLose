import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerPlanId } from "../../../store/planSlice";
import { useParams } from "react-router-dom";
import { registerLastEntered } from "../../../store/statusSlice";

import classes from "./PlanPage.module.css";

import TopHistoryNav from "../../TopNav/TopHistoryNav";
import MealNutrientInfo from "../../MainPage/MealNutrientInfo/MealNutrientInfo";
import UserFoodList from "../../MainPage/UserFoodList/UserFoodList";
import NutrientChart from "../../MainPage/NutrientChart/NutrientChart";
import NutrientProgressBox from "../../MainPage/NutrientProgressBox/NutrientProgressBox";

function PlanMealSummaryPage({ colorSet }) {
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

  const params = useParams();
  const meal = {
    BREAKFAST: "아침",
    LUNCH: "점심",
    DINNER: "저녁",
    SNACK: "간식",
  };

  useEffect(() => {
    localStorage.setItem("mealtime", params.mealtime);
    dispatch(registerLastEntered(params.mealtime));
  }, [params, dispatch]);

  return (
    <div className={classes.plan_page}>
      {dailyMeal.length ? (
        <div>
          <div id="top_nav_area">
            <TopHistoryNav text={`${meal[params.mealtime]}`} />
          </div>
          <div
            style={{
              margin: "10vh 5vw 15vh",
            }}
          >
            <MealNutrientInfo dietSum={dailyMeal[0].sums[params.mealtime]} />
            <UserFoodList foodList={dailyMeal[0].details[params.mealtime]} />
            <NutrientChart
              dietSum={dailyMeal[0].sums[params.mealtime]}
              colorSet={colorSet}
            />
            <NutrientProgressBox
              userInfo={userInfo}
              dietSum={dailyMeal[0].sums[params.mealtime]}
              colorSet={colorSet}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default PlanMealSummaryPage;
