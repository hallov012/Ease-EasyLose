import classes from "./UserFoodList.module.css"
import UserFoodItem from "../UserFoodItem/UserFoodItem"
import { useHistory, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { instance } from "../../../api/index"
import { useDispatch, useSelector } from "react-redux"
import { registerDailyDiet } from "../../../store/dailySlice"
import dateFormat, { masks } from "dateformat"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { registerDailyMealList } from "../../../store/planSlice"

function UserFoodList(props) {
  const history = useHistory()
  const location = useLocation()
  const [foodItems, setFoodItems] = useState(<div></div>)
  const target_date = JSON.parse(
    useSelector((state) => state.status.targetDate)
  )

  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch()
  useEffect(() => {
    if (props.foodList) {
      // const foodComponent = foodList.map((data, idx) => (
      //   <UserFoodItem food={data} />
      // ))
      // setFoodItems(foodComponent)
      setFoodItems(
        props.foodList.map((item) => {
          return (
            <div key={item.id} style={{ width: "100%", height: "8vh" }}>
              <div className={classes.container}>
                <div className={classes.left}>
                  <div className={classes.item_title}>{item.food.name}</div>
                  <div className={classes.item_subtitle}>
                    {Math.round(item.food.calorie)}kcal X {item.count}개 (
                    {Math.round(item.food.calorie) * item.count}kcal)
                  </div>
                </div>
                <div className={classes.right}>
                  <div
                    onClick={() => {
                      history.push("/add/detail", { foodInfo: item.food })
                    }}
                  >
                    <i className="fa-regular fa-circle-question"></i>
                  </div>
                  <div
                    onClick={() => {
                      Swal.fire({
                        title: "정말 삭제할까요?",
                        text: "한 번 더 확인해주세요!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "삭제",
                        cancelButtonText: "취소",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          if (typeof target_date !== "number") {
                            instance
                              .delete(`/dailymeal/${item.id}`, {})
                              .then((response) => {
                                instance
                                  .get("/dailymeal", {
                                    params: {
                                      date: dateFormat(
                                        target_date,
                                        "yyyy-mm-dd"
                                      ),
                                    },
                                  })
                                  .then((response) => {
                                    dispatch(registerDailyDiet(response.data))
                                  })
                                  .catch((error) => console.log(error))
                                MySwal.fire({
                                  icon: "success",
                                  title: "성공적으로 삭제되었습니다!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                })
                              })
                              .catch((error) => console.log(error))
                          } else {
                            instance
                              .delete(`/foodset/${target_date}/${item.id}`, {})
                              .then((response) => {
                                instance
                                  .get("/foodset", {})
                                  .then((response) => {
                                    dispatch(
                                      registerDailyMealList(response.data)
                                    )
                                  })
                                  .catch((error) => console.log(error))
                                MySwal.fire({
                                  icon: "success",
                                  title: "성공적으로 삭제되었습니다!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                })
                              })
                          }
                        }
                      })
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )
    }
  }, [props])

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
        <span>음식 추가하기</span>
      </div>
    </div>
  )
}
export default UserFoodList
