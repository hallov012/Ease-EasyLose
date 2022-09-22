import classes from "./MealSelectBtn.module.css"

function MealSelectBtn(props) {
  const activeGradient =
    "linear-gradient(90deg, var(--main-color) 20%, var(--light-color) 80%)"
  return (
    <div
      className={`${classes.meal_btn} box_shadow`}
      style={{
        background: props.selected ? activeGradient : "var(--gray-color)",
      }}
    >
      {props.type}
    </div>
  )
}
export default MealSelectBtn
