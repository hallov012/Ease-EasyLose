import { borderRadius } from "@mui/system";
import { useEffect, useState } from "react";
import classes from "./ToggleButton.module.css";
import { useLocation, useHistory } from "react-router-dom";

function ToggleButton({ info }) {
  const history = useHistory();
  const location = useLocation().pathname;
  const buttonList = [info[0].name, info[1].name];
  const [selected, setSelected] = useState(
    info[0].path === location ? [true, false] : [false, true]
  );
  return (
    <div className={classes.container}>
      <div
        className={selected[0] ? classes.pickedItem : classes.unpickedItem}
        style={{ borderRadius: "5px 0 0 5px" }}
        onClick={() => {
          history.push(info[0].path);
        }}
      >
        {buttonList[0]}
      </div>
      <div
        className={selected[1] ? classes.pickedItem : classes.unpickedItem}
        style={{ borderRadius: "0 5px 5px 0" }}
        onClick={() => {
          history.push(info[1].path);
        }}
      >
        {buttonList[1]}
      </div>
    </div>
  );
}

export default ToggleButton;
