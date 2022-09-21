import classes from "./WeightPicker.module.css";
import { useEffect, useState } from "react";
import SlideCounter from "../SlideCounter/SlideCounter";

function WeightPicker({ setWeight, value }) {
  const [wei, setWei] = useState(60);
  useEffect(() => {
    setWei(value);
  }, []);

  useEffect(() => {
    setWeight(wei);
  }, [wei]);

  return (
    <div className={classes.container}>
      <SlideCounter
        value={wei}
        setValue={(value) => {
          setWei(value);
        }}
        width={"100%"}
        height={"100%"}
        point={0.1}
        type={"float"}
        from={30}
        to={150}
      ></SlideCounter>
    </div>
  );
}

export default WeightPicker;
