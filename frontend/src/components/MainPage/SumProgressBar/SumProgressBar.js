import classes from "./SumProgressBar.module.css";

function SumProgressBar(props) {
  return (
    <div>
      <div className={classes.sum_progress}>
        <div
          className={classes.first_line}
          style={{ width: props.percent[0] + "%" }}
        >
          {props.percent[0]}%
        </div>
        <div
          className={classes.second_line}
          style={{ width: props.percent[1] + "%" }}
        >
          {props.percent[1]}%
        </div>
        <div
          className={classes.third_line}
          style={{ width: props.percent[2] + "%" }}
        >
          {props.percent[2]}%
        </div>
      </div>
      <div className={classes.info_box}>
        <div className={classes.info_item}>
          <div style={{ background: "var(--sub-color)" }}></div>
          <span>탄수화물: {props.amount[0]}g</span>
        </div>
        <div className={classes.info_item}>
          <div style={{ background: "var(--main-color)" }}></div>
          <span>단백질: {props.amount[1]}g</span>
        </div>
        <div className={classes.info_item}>
          <div style={{ background: "var(--light-color)" }}></div>
          <span>지방: {props.amount[2]}g</span>
        </div>
      </div>
    </div>
  );
}
export default SumProgressBar;
