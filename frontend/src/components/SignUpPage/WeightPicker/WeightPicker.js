import classes from "./WeightPicker.module.css";
import { useEffect, useState } from "react";
import SlideCounter from "../SlideCounter/SlideCounter";
import { NavLink } from "react-router-dom";

function WeightPicker({ setWeight, value }) {
  const [wei, setWei] = useState(60);
  useEffect(() => {
    setWei(value);
  }, []);

  useEffect(() => {
    setWeight(wei);
  }, [wei]);

  return (
    <div>
      <div className={classes.container}>
        <SlideCounter
          value={wei}
          setValue={(value) => {
            setWei(value);
          }}
          width={"100%"}
          height={"100%"}
          point={0.5}
          type={"float"}
          from={30}
          to={150}
          unit={"kg"}
        ></SlideCounter>
      </div>
      <div className={classes.addButtonContainer}>
        <NavLink to="/signup/activity" className={classes.addButton}>
          입력 완료
        </NavLink>
      </div>
    </div>
  );
}

export default WeightPicker;
