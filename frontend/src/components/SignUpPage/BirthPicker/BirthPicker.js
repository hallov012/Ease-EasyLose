import SlideCounter from "../SlideCounter/SlideCounter";
import classes from "./BirthPicker.module.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function BirthPicker({ setBirth, value }) {
  const [year, setYear] = useState(2000);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [dayEnd, setDayEnd] = useState(31);
  useEffect(() => {
    setYear(Number(value.substring(0, 4)));
    setMonth(Number(value.substring(4, 6)));
    setDay(Number(value.substring(6, 8)));
  }, []);

  useEffect(() => {
    setDayEnd(new Date(year, month, -1).getDate() + 1);
  }, [year, month]);

  useEffect(() => {
    if (day > dayEnd) setDay(dayEnd);
  }, [dayEnd]);

  useEffect(() => {
    setBirth(
      `${year.toString().padStart(4, "0")}${month
        .toString()
        .padStart(2, "0")}${day.toString().padStart(2, "0")}`
    );
  }, [year, month, day]);

  return (
    <div>
      <div className={classes.container}>
        <SlideCounter
          value={year}
          setValue={(value) => {
            setYear(value);
          }}
          width={"30%"}
          height={"100%"}
          point={1}
          type={"integer"}
          from={0}
          to={2021}
          unit={"년"}
        ></SlideCounter>
        <SlideCounter
          value={month}
          setValue={(value) => {
            setMonth(value);
          }}
          width={"30%"}
          height={"100%"}
          point={1}
          type={"integer"}
          from={1}
          to={12}
          unit={"월"}
        ></SlideCounter>
        <SlideCounter
          value={day}
          setValue={(value) => {
            setDay(value);
          }}
          width={"30%"}
          height={"100%"}
          point={1}
          type={"integer"}
          from={1}
          to={dayEnd}
          unit={"일"}
        ></SlideCounter>
      </div>
      <div className={classes.addButtonContainer}>
        <NavLink to="/signup/height" className={classes.addButton}>
          입력 완료
        </NavLink>
      </div>
    </div>
  );
}

export default BirthPicker;
