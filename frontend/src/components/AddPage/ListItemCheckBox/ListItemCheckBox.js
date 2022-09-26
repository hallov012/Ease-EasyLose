import { useLocation, useHistory } from "react-router-dom";
import classes from "./ListItemCheckBox.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerItem, removeItem } from "../../../store/basketSlice";

function ListItemCheckBox({ foodInfo }) {
  const location = useLocation();
  const history = useHistory();
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();

  const onClickHandler = () => {
    if (added) {
      dispatch(removeItem(foodInfo));
      setAdded(false);
    } else {
      dispatch(registerItem(foodInfo));
      setAdded(true);
    }
  };

  return (
    <div className={classes.container}>
      <div
        onClick={() => {
          history.push("/add/detail", { from: location, foodInfo: foodInfo });
        }}
        className={classes.icontainer}
      >
        <div>{foodInfo.name}</div>
        <div className={classes.acontainer}>
          <div className={classes.amount}>{foodInfo.total_amount}</div>
          <div className={classes.calorie}>{foodInfo.calorie}kcal</div>
        </div>
      </div>
      <div
        onClick={onClickHandler}
        style={{ fontSize: 30, color: "var(--main-color)" }}
      >
        {added ? (
          <i className="fa-solid fa-circle-check"></i>
        ) : (
          <i class="fa-regular fa-circle-check"></i>
        )}
      </div>
    </div>
  );
}

export default ListItemCheckBox;
