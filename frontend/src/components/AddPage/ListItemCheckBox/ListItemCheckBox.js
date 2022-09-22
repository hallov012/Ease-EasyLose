import { useEffect } from "react";
import TopNav from "../../TopNav/TopNav";
import classes from "./ListItemCheckBox.module.css";

function ListItemCheckBox(props) {
  return (
    <div className={classes.container}>
      <div className={classes.icontainer}>
        <div>인표네 떡볶이</div>
        <div className={classes.acontainer}>
          <div className={classes.amount}>1인분</div>
          <div className={classes.calorie}>300kcal</div>
        </div>
      </div>
      <div style={{ fontSize: 30, color: "var(--main-color)" }}>
        <i className="fa-solid fa-circle-check"></i>
        {/* <i class="fa-regular fa-circle-check"></i> */}
      </div>
    </div>
  );
}

export default ListItemCheckBox;
