import { useEffect } from "react"
import classes from "./RecommendListItem.module.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { registerTestItem, removeTestItem } from "../../../store/planSlice"
import { useHistory } from "react-router-dom"

function RecommendListItem({ foodInfo, reason }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const [sentence, setSentence] = useState("")
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    let temp = ""
    if (reason.includes("carb")) temp += "탄수화물 "
    if (reason.includes("protein")) temp += "단백질 "
    if (reason.includes("fat")) temp += "지방 "
    setSentence((temp + "보충 가능!").trim())
  }, [reason])

  function onClickHandler() {
    history.push("/add/detail", { foodInfo: foodInfo })
  }

  function onCheckHandler() {
    if (checked) dispatch(removeTestItem(foodInfo))
    else dispatch(registerTestItem(foodInfo))
    setChecked(checked ? false : true)
  }

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.item_title}> {foodInfo.name}</div>
        <div className={classes.item_subtitle}>{sentence}</div>
      </div>
      <div className={classes.right}>
        <div onClick={onCheckHandler} style={{ marginRight: "10%" }}>
          {checked ? (
            <i className="fa-solid fa-square-check"></i>
          ) : (
            <i className="fa-regular fa-square-check"></i>
          )}
        </div>
        <div onClick={onClickHandler}>
          <i className="fa-regular fa-circle-question"></i>
        </div>
      </div>
    </div>
  )
}

export default RecommendListItem
