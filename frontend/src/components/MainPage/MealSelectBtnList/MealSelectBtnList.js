import classes from "./MealSelectBtnList.module.css"
import MealSelectBtn from "../MealSelectBtn/MealSelectBtn"

import { useState, useEffect } from "react"

function MealSelectBtnList() {
  const MealName = ["전체", "아침", "점심", "저녁", "간식"]
  const [select, setSelect] = useState([1, 0, 0, 0, 0])
  const mealClick = (e) => console.log(e.target)

  const mealBtns = MealName.map((meal, idx) => (
    <div
      onClick={() => {
        setSelect(() => {
          const temp = [0, 0, 0, 0, 0]
          temp[idx] = 1
          return temp
        })
      }}
      id={idx}
    >
      <MealSelectBtn type={meal} key={idx} selected={select[idx]} />
    </div>
  ))
  return <div className={classes.btn_area}>{mealBtns}</div>
}
export default MealSelectBtnList
