import classes from "./MealSummary.module.css";
import TopNav from "../../TopNav/TopNav";
import MealNutrientInfo from "../MealNutrientInfo/MealNutrientInfo";
import UserFoodList from "../UserFoodList/UserFoodList";
import NutrientChart from "../NutrientChart/NutrientChart";
import NutrientProgressBox from "../NutrientProgressBox/NutrientProgressBox";

import { useParams } from "react-router-dom";

import { registerLastEntered } from "../../../store/statusSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function MealSummaryPage(props) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const userDailyDiet = useSelector((state) => state.daily.dailyDiet);
  const [value, setValue] = useState({
    dietSum: undefined,
    foodList: undefined,
  });
  // console.log(props.userDailyDiet)

  const params = useParams();
  const meal = {
    BREAKFAST: { title: "아침", icon: "fa-cloud-sun" },
    LUNCH: { title: "점심", icon: "fa-sun" },
    DINNER: { title: "저녁", icon: "fa-moon" },
    SNACK: { title: "간식", icon: "fa-cookie-bite" },
  };
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("mealtime", params.mealtime);
    dispatch(registerLastEntered(params.mealtime));
  }, [params, dispatch]);

  useEffect(() => {
    if (userDailyDiet) {
      const temp = { dietSum: undefined, foodList: undefined };
      temp.dietSum = userDailyDiet[0].sums[params.mealtime];
      temp.foodList = userDailyDiet[0].details[params.mealtime];
      setValue(temp);
    }
  }, [userDailyDiet]);

  return (
    <div>
      <div id="top_nav_area">
        <TopNav text={meal[params.mealtime].title} arrow={["/main", ""]} />
      </div>
      <div className={classes.icon}>
        <i className={`fa-solid ${meal[params.mealtime].icon}`}></i>
      </div>
      <div
        style={{
          margin: "10vh 5vw 15vh",
        }}
      >
        <MealNutrientInfo dietSum={value.dietSum} />
        <UserFoodList foodList={value.foodList} />
        <NutrientChart dietSum={value.dietSum} colorSet={props.colorSet} />
        <NutrientProgressBox
          userInfo={userInfo}
          dietSum={value.dietSum}
          colorSet={props.colorSet}
        />
      </div>
    </div>
  );
}
export default MealSummaryPage;
