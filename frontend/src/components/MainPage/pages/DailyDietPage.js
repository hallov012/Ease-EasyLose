import TopNavDate from "../../../components/TopNav/TopNavDate";
import NutrientSummary from "../NutrientSummary/NutrientSummary";
import SumProgressBar from "../SumProgressBar/SumProgressBar";
import MealCardList from "../MealCardList/MealCardList";

import { useSelector } from "react-redux";

function DailyDietPage() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const userDailyDiet = useSelector((state) => state.daily.dailyDiet);
  // const [progressBarPercent, setProgressBarPercent] = useState([33, 33, 33])
  // const [progressBarAmount, setProgressBarAmount] = useState([50, 50, 50])
  return (
    <div>
      <div id="top_nav_area">
        <TopNavDate />
      </div>
      <div style={{ margin: "10vh 5vw" }}>
        <NutrientSummary
          userInfo={userInfo}
          userDailyDiet={userDailyDiet}
          path={"/main"}
        />
        <SumProgressBar userDailyDiet={userDailyDiet} />
        <MealCardList
          userInfo={userInfo}
          userDailyDiet={userDailyDiet}
          path={"/main"}
        />
      </div>
    </div>
  );
}
export default DailyDietPage;
