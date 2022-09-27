import classes from "./SumProgressBar.module.css"
import { useState, useEffect } from "react"

function SumProgressBar(props) {
  const userDailyDiet = props.userDailyDiet
  const [value, setValue] = useState({
    percent: [33, 33, 33],
    amount: [0, 0, 0],
  })
  useEffect(() => {
    if (userDailyDiet) {
      const temp = { percent: [0, 0, 0], amount: [0, 0, 0] }
      temp.percent[0] = Math.ceil(
        ((userDailyDiet[0].total.carb * 4) / userDailyDiet[0].total.calorie) *
          100
      )
      temp.percent[1] = Math.ceil(
        ((userDailyDiet[0].total.protein * 4) /
          userDailyDiet[0].total.calorie) *
          100
      )
      temp.percent[2] = Math.ceil(
        ((userDailyDiet[0].total.fat * 8) / userDailyDiet[0].total.calorie) *
          100
      )
      temp.amount[0] = userDailyDiet[0].total.carb
      temp.amount[1] = userDailyDiet[0].total.protein
      temp.amount[2] = userDailyDiet[0].total.fat
      setValue(temp)
    }
  }, [userDailyDiet])

  return (
    <div>
      <div className={classes.sum_progress}>
        <div
          className={classes.first_line}
          style={{ width: value.percent[0] + "%" }}
        >
          {value.percent[0]}%
        </div>
        <div
          className={classes.second_line}
          style={{ width: value.percent[1] + "%" }}
        >
          {value.percent[1]}%
        </div>
        <div
          className={classes.third_line}
          style={{ width: value.percent[2] + "%" }}
        >
          {value.percent[2]}%
        </div>
      </div>
      <div className={classes.info_box}>
        <div className={classes.info_item}>
          <div style={{ background: "var(--sub-color)" }}></div>
          <span>탄수화물: {value.amount[0]}g</span>
        </div>
        <div className={classes.info_item}>
          <div style={{ background: "var(--main-color)" }}></div>
          <span>단백질: {value.amount[1]}g</span>
        </div>
        <div className={classes.info_item}>
          <div style={{ background: "var(--light-color)" }}></div>
          <span>지방: {value.amount[2]}g</span>
        </div>
      </div>
    </div>
  )
}
export default SumProgressBar
