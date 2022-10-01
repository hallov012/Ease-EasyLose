import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PlanNav from "../PlanNav/PlanNav";
import NutrientSummary from "../../../components/MainPage/NutrientSummary/NutrientSummary";
import SumProgressBar from "../../../components/MainPage/SumProgressBar/SumProgressBar";
import MealCardList from "../../../components/MainPage/MealCardList/MealCardList";

import classes from "./PlanPage.module.css";

function PlanDetailPage() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const planId = useSelector((state) => state.plan.planId);
  const dailyMealList = useSelector((state) => state.plan.dailyMealList);
  const [dailyMeal, setDailyMeal] = useState(undefined);
  function isPlan(element) {
    if (element.id === planId) {
      return true;
    }
  }
  useEffect(() => {
    if (planId && dailyMealList) {
      setDailyMeal(dailyMealList.filter(isPlan));
    }
  }, [planId, dailyMealList]);

  console.log(dailyMeal);
  return (
    <div className={classes.plan_page}>
      {dailyMeal ? (
        <div>
          <div id="top_nav_area">
            <PlanNav title={dailyMeal[0].name} planId={planId} />
          </div>
          <div style={{ margin: "10vh 5vw" }}>
            <NutrientSummary userInfo={userInfo} userDailyDiet={dailyMeal} />
            <SumProgressBar userDailyDiet={dailyMeal} />
            <MealCardList userInfo={userInfo} userDailyDiet={dailyMeal} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default PlanDetailPage;
