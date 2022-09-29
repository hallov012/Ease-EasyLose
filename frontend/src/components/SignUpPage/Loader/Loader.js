import classes from "./Loader.module.css";

function Loader() {
  return (
    <div className={`${classes.container} gradient_color__vertical`}>
      <div className={classes.loader}>
        <div className={classes.shadow}></div>
        <div className={classes.box}></div>
      </div>
      <div className={classes.text}>
        <p>Ease가 당신을 위한</p>
        <p>추천 영양 비율을 계산 중입니다!</p>
      </div>
    </div>
  );
}
export default Loader;
