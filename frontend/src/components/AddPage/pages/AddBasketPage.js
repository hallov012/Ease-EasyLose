import classes from "./AddBasketPage.module.css"
import AddButtonList from "../AddButtonList/AddButtonList"
import TopHistoryNav from "../../TopNav/TopHistoryNav"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { initializeBasket } from "../../../store/basketSlice"
import { instance } from "../../../api/index"

function AddBasketPage() {
  const accessToken = useSelector((state) => state.user.accessToken)
  const pickedList = useSelector((state) => state.basket.pickedList)

  const mealtime = useSelector((state) => state.status.lastEntered)
  const targetDate = useSelector((state) => state.daily.targetDate)

  const history = useHistory()
  const dispatch = useDispatch()

  async function registerPickedList() {
    await pickedList.map((item) => {
      instance
        .post(
          "/dailymeal",
          {
            date: targetDate,
            mealType: mealtime,
            count: item.count,
            foodId: item.id,
          },
          {}
        )
        .then((response) => {
          console.log(response)
        })
        .catch((error) => console.log(error))
      //   axios({
      //     method: "post",
      //     url: "https://j7a704.p.ssafy.io/api/v1/dailymeal",
      //     data: {
      //       date: targetDate,
      //       mealType: mealtime,
      //       count: item.count,
      //       foodId: item.id,
      //     },
      //     headers: { Authorization: `Bearer ${accessToken}` },
      //   })
      //     .then((response) => {
      //       console.log(response)
      //     })
      //     .catch((error) => console.log(error))
    })
  }

  const onClickHandler = () => {
    registerPickedList()
    dispatch(initializeBasket())
    history.push(`/main/meal/${mealtime}`)
  }

  const sumCalorie = () => {
    let sum = 0
    pickedList.map((item) => {
      sum += item.calorie
    })
    return sum
  }
  return (
    <div>
      <div id="top_nav_area">
        <TopHistoryNav></TopHistoryNav>
      </div>
      <div style={{ marginTop: "9vh" }} className={classes.container}>
        <div>
          <div className={classes.title}>추가될 음식</div>
          {pickedList.map((item, index) => {
            return (
              <div className={classes.item} key={index}>
                <div className={classes.itemInfo}>
                  <div className={classes.name}>{item.name}</div>
                  <div className={classes.amount}>{item.total_amount}</div>
                </div>
                <div className={classes.calorie}>{item.calorie}kcal</div>
              </div>
            )
          })}
        </div>
        <div className={classes.sum}>
          <div>합계</div>
          <div>
            {sumCalorie()}
            kcal
          </div>
        </div>
      </div>
      <div onClick={onClickHandler} className={classes.addButtonContainer}>
        <div className={classes.addButton}>추가하기</div>
      </div>
      <AddButtonList></AddButtonList>
    </div>
  )
}

export default AddBasketPage
