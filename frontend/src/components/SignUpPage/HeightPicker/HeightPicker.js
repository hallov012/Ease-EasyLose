import classes from "./HeightPicker.module.css";
import { useEffect, useState } from "react";
import SlideCounter from "../SlideCounter/SlideCounter";
import { NavLink } from "react-router-dom";

function HeightPicker({ setHeight, value }) {
  const [hei, setHei] = useState(180);
  useEffect(() => {
    setHei(Number(value));
  }, []);
  useEffect(() => {
    setHeight(hei);
  }, [hei]);
  return (
    <div>
      <div className={classes.container}>
        <SlideCounter
          value={hei}
          setValue={(value) => {
            setHei(value);
          }}
          width={"100%"}
          height={"100%"}
          point={0.5}
          type={"float"}
          from={100}
          to={250}
          unit={"cm"}
        ></SlideCounter>
      </div>
      <div className={classes.addButtonContainer}>
        <NavLink to="/signup/weight" className={classes.addButton}>
          입력 완료
        </NavLink>
      </div>
    </div>
  );
}

export default HeightPicker;
