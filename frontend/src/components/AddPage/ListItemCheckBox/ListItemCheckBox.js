import { useLocation, useHistory } from "react-router-dom"
import classes from "./ListItemCheckBox.module.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory"

function ListItemCheckBox({ foodInfo, selected, type }) {
  const location = useLocation()
  const history = useHistory()
  const [added, setAdded] = useState(selected)
  const dispatch = useDispatch()

  const onClickHandler = () => {
    if (added) {
      setAdded(false)
    } else {
      history.push("/add/amount", { foodInfo: foodInfo, type: type })
      setAdded(true)
    }
  }

  return (
    <div
      className={classes.container}
      style={{ display: !selected && added ? "none" : "flex" }}
    >
      <div className={classes.left}>
        <div className={classes.item_title}>{foodInfo.name}</div>
        <div className={classes.item_subtitle}>
          {Math.round(foodInfo.calorie)}kcal
        </div>
      </div>
      <div className={classes.right}>
        <div
          onClick={() => {
            history.push("/add/detail", { foodInfo: foodInfo })
          }}
        >
          <i className="fa-regular fa-circle-question"></i>
        </div>
        <div
          style={{ color: "var(--main-color)", fontSize: "1.8rem" }}
          onClick={onClickHandler}
        >
          <i className="fa-regular fa-square-plus"></i>
        </div>
      </div>
    </div>
  )
}

export default ListItemCheckBox
