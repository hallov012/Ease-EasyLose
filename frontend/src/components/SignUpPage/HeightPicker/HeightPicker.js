import classes from "./HeightPicker.module.css";
import { useEffect, useState } from "react";
import SlideCounter from "../SlideCounter/SlideCounter";

function HeightPicker({ setHeight, value }) {
  const [hei, setHei] = useState(180);
  useEffect(() => {
    setHei(Number(value));
  }, []);
  useEffect(() => {
    setHeight(hei);
  }, [hei]);
  return (
    <div className={classes.container}>
      <SlideCounter
        value={hei}
        setValue={(value) => {
          setHei(value);
        }}
        width={"100%"}
        height={"100%"}
        point={0.1}
        type={"float"}
        from={100}
        to={250}
      ></SlideCounter>
    </div>
  );
}

export default HeightPicker;
