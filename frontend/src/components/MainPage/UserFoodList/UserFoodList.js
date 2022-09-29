import classes from "./UserFoodList.module.css"
import UserFoodItem from "../UserFoodItem/UserFoodItem"
import { useHistory, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

function UserFoodList(props) {
  const foodList = props.foodList
  const history = useHistory()
  const location = useLocation()
  const [foodItems, setFoodItems] = useState(<div></div>)
  console.log(props.foodList)

  useEffect(() => {
    if (foodList) {
      // const foodComponent = foodList.map((data, idx) => (
      //   <UserFoodItem food={data} />
      // ))
      // setFoodItems(foodComponent)
      setFoodItems(
        props.foodList.map((item) => {
          return (
            <div key={item.food.id} style={{ width: "90vw", height: "8vh" }}>
              <div className={classes.container}>
                <div className={classes.left}>
                  <div className={classes.item_title}>{item.food.name}</div>
                  <div className={classes.item_subtitle}>
                    {item.food.calorie}kcal X {item.count}개 (
                    {item.food.calorie * item.count}kcal)
                  </div>
                </div>
                <div className={classes.right}>
                  <div>
                    <i className="fa-regular fa-circle-question"></i>
                  </div>
                  <div>
                    <i className="fa-solid fa-trash-can"></i>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )
    }
  }, [foodList])

  return (
    <div className={classes.user_food_box}>
      <div className={classes.top_area}>
        <span className={classes.box_name}>식사 목록</span>
      </div>
      <div className={classes.food_list_box}>{foodItems}</div>
      {/* {props.foodList ? showFoodList() : <div></div>} */}
      <div
        className={`${classes.add_btn} box_shadow`}
        onClick={() => {
          history.push("/add/search", { from: location })
        }}
      >
        <span>먹은 음식 추가하기</span>
      </div>
    </div>
  )
}
export default UserFoodList
