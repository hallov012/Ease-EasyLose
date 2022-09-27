import classes from "./AddAmountPage.module.css"
import { useState } from "react"
import AddButtonList from "../AddButtonList/AddButtonList"

import TopNav from "../../TopNav/TopNav"
import { useHistory } from "react-router-dom"
import { registerItem } from "../../../store/basketSlice"
import { useDispatch } from "react-redux"

function AddAmountPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(1)
  const foodInfo = history.location.state.foodInfo

  const onClickHandler = () => {
    const temp = { ...foodInfo, count: amount }
    dispatch(registerItem(temp))
    history.goBack()
  }

  return (
    <div>
      <div id="top_nav_area">
        <TopNav arrow={["/add/search", ""]}></TopNav>
      </div>
      <div style={{ marginTop: "9vh" }} className={classes.container}>
        <div className={classes.info}>
          <div>1200 kcal</div>
        </div>
        {amount}인분
        <input
          type={"range"}
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value)
          }}
          min={0.5}
          step={0.5}
          max={5.0}
        ></input>
      </div>
      <div onClick={onClickHandler} className={classes.addButtonContainer}>
        <div className={classes.addButton}>추가하기</div>
      </div>
      <AddButtonList></AddButtonList>
    </div>
  )
}

export default AddAmountPage
