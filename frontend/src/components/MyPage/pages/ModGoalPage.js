import classes from "./ModGoalPage.module.css"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import TopHistoryNav from "../../TopNav/TopHistoryNav"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { instance } from "../../../api/index"
import { registerUserInfo } from "../../../store/userSlice"
import { useHistory } from "react-router-dom"

function ModGoalPage() {
  const userInfo = useSelector((state) => state.user.userInfo)
  const [goal, setGoal] = useState(null)
  const [selected, setSelected] = useState([false, false, false])
  console.log(userInfo)
  const history = useHistory()

  const _userInfo = {
    gender: userInfo.gender,
    age: userInfo.age,
    height: userInfo.height,
    weight: userInfo.weight,
    activityLevel: userInfo.activityLevel,
    goal: userInfo.goal,
    dailyCalorie: userInfo.dailyCalorie,
    dailyCarb: userInfo.dailyCarb,
    dailyProtein: userInfo.dailyProtein,
    dailyFat: userInfo.dailyFat,
    isAutomatic: true,
  }

  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch()

  useEffect(() => {
    setGoal(userInfo.goal)
    if (userInfo.goal === "KEEP") setSelected([true, false, false])
    else if (userInfo.goal === "DIET") setSelected([false, true, false])
    else setSelected([false, false, true])
  }, [userInfo])

  const array = [
    {
      title: "유지",
      explanation: "체중 유지를 목표로 합니다",
      subexp: "탄수화물 50%, 단백질 30%, 지방 20%",
      value: "KEEP",
    },
    {
      title: "다이어트",
      explanation: "체중 감량을 목표로 합니다",
      subexp: "탄수화물 30%, 단백질 40%, 지방 30%",
      value: "DIET",
    },
    {
      title: "벌크업",
      explanation: "체중 증가를 목표로 합니다",
      subexp: "탄수화물 40%, 단백질 40%, 지방 20%",
      value: "BULK",
    },
  ]

  return (
    <div>
      {goal ? (
        <div>
          <div id="top_nav_area">
            <TopHistoryNav></TopHistoryNav>
          </div>
          <div style={{ marginTop: "15vh", fontSize: "2.0rem" }}>목표 수정</div>
          <div className={classes.container}>
            {array.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setGoal(array[index].value)
                    setSelected(() => {
                      const newArray = [false, false, false]
                      newArray[index] = true
                      return newArray
                    })
                  }}
                  className={
                    selected[index] ? classes.pickedItem : classes.goalItem
                  }
                >
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "1000",
                      marginLeft: "3vw",
                    }}
                  >
                    {item.title}
                  </div>
                  <div className={classes.exp} style={{ marginLeft: "3vw" }}>
                    <div>{item.explanation}</div>
                    <div>{item.subexp}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div
            onClick={() => {
              instance
                .put("/user", { ..._userInfo, goal: goal }, {})
                .then((response) => {
                  dispatch(registerUserInfo(response.data))
                  MySwal.fire({
                    icon: "success",
                    title: "성공적으로 수정되었습니다!",
                    showConfirmButton: false,
                    timer: 1500,
                  })
                  history.goBack()
                })
            }}
            className={classes.addButtonContainer}
          >
            <div className={classes.addButton}>수정하기</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ModGoalPage
