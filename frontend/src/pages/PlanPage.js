import { useEffect } from "react";
import { Route } from "react-router-dom";
import PlanMainPage from "../components/PlanPage/Pages/PlanMainPage";
import { instance } from "../api/index";
import { useDispatch } from "react-redux";
import { registerDailyMealList, registerOneMealList } from "../store/planSlice";

function PlanPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    instance
      .get("/foodset", {})
      .then((response) => {
        dispatch(registerDailyMealList(response.data));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Route path="/plan" exact>
        <PlanMainPage></PlanMainPage>
      </Route>
    </div>
  );
}

export default PlanPage;
