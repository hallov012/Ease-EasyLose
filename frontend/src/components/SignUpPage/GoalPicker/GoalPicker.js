import { useEffect, useState } from "react";
import classes from "./GoalPicker.module.css";
import { useHistory } from "react-router-dom";

function GoalPicker({ setValue, value }) {
  const history = useHistory();
  const [selected, setSelected] = useState([false, false, false]);
  useEffect(() => {
    if (value >= 0 && value < 3) {
      setSelected(() => {
        const newArray = [false, false, false];
        newArray[Number(value)] = true;
        return newArray;
      });
    }
  }, [value]);
  const array = [
    {
      title: "유지",
      explanation: "체중 유지를 목표로 합니다",
      subexp: "탄수화물 50%, 단백질 30%, 지방 20%",
    },
    {
      title: "다이어트",
      explanation: "체중 감량을 목표로 합니다",
      subexp: "탄수화물 30%, 단백질 40%, 지방 30%",
    },
    {
      title: "벌크업",
      explanation: "체중 증가를 목표로 합니다",
      subexp: "탄수화물 40%, 단백질 40%, 지방 20%",
    },
  ];

  return (
    <div className={classes.container}>
      {array.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setValue(index);
              setSelected(() => {
                const newArray = [false, false, false];
                newArray[index] = true;
                return newArray;
              });
              history.push("/signup/complete");
            }}
            className={selected[index] ? classes.pickedItem : classes.goalItem}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "1000",
                marginLeft: "3vw",
              }}
            >
              {item.title}
            </div>
            <div className={classes.exp} style={{ marginLeft: "3vw" }}>
              <div>{item.explanation}</div>
              <div>{item.subexp}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GoalPicker;
