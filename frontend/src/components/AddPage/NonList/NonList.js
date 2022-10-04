import classes from "./NonList.module.css";
import food from "../../../assets/foods.png";

function NonList() {
  return (
    <div className={classes.loader}>
      <img className={classes.img} src={food} alt="?" />
      <div className={classes.shadow}></div>
    </div>
  );
}
export default NonList;

/* <i className={classes.fa-solid fa-pizza-slice"></i>
<i className={classes.fa-solid fa-apple-whole"></i>
<i className="fa-solid fa-burger"></i>
<i className="fa-solid fa-carrot"></i>
<i className="fa-solid fa-egg"></i>
<i className="fa-solid fa-hotdog"></i> */
