import classes from "./SumProgressBar.module.css"

function SumProgressBar() {
  const percent = [30, 50, 20]
  const amount = [36, 50, 21]

  return (
    <div>
      <div className={classes.sum_progress}>
        <div className={classes.first_line} style={{ width: percent[0] + "%" }}>
          {percent[0]}%
        </div>
        <div
          className={classes.second_line}
          style={{ width: percent[1] + "%" }}
        >
          {percent[1]}%
        </div>
        <div className={classes.third_line} style={{ width: percent[2] + "%" }}>
          {percent[2]}%
        </div>
      </div>
      <div className={classes.info_box}>
        <div className={classes.info_item}>
          <div style={{ background: "var(--sub-color)" }}></div>
          <span>탄수화물: {amount[0]}g</span>
        </div>
        <div className={classes.info_item}>
          <div style={{ background: "var(--main-color)" }}></div>
          <span>단백질: {amount[1]}g</span>
        </div>
        <div className={classes.info_item}>
          <div style={{ background: "var(--light-color)" }}></div>
          <span>지방: {amount[2]}g</span>
        </div>
      </div>
    </div>
  )
}
export default SumProgressBar
