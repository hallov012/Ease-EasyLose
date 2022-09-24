import classes from "./Activity.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonWalking,
  faChair,
  faRunning,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function ActivityPicker({ setValue, value }) {
  const history = useHistory();
  const [selected, setSelected] = useState([false, false, false, false]);

  useEffect(() => {
    if (value >= 0 && value < 4) {
      setSelected(() => {
        const newArray = [false, false, false, false];
        newArray[Number(value)] = true;
        return newArray;
      });
    }
  }, [value]);

  const array = [
    { icon: faChair, explanation: "30분 이하의 아주 가벼운 활동" },
    { icon: faPersonWalking, explanation: "1~2시간 사이의 가벼운 활동" },
    { icon: faRunning, explanation: "2~4시간 사이의 보통 활동" },
    { icon: faDumbbell, explanation: "4시간 이상의 심한 활동" },
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
                const newArray = [false, false, false, false];
                newArray[index] = true;
                return newArray;
              });
              history.push("/signup/goal");
            }}
            className={
              selected[index] ? classes.pickedItem : classes.activityItem
            }
          >
            <div
              style={{
                marginLeft: "3vw",
                fontSize: "36px",
                marginRight: "3vw",
              }}
            >
              <FontAwesomeIcon icon={item.icon} fixedWidth></FontAwesomeIcon>
            </div>
            <span>{item.explanation}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ActivityPicker;
