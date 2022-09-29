import classes from "./ModHeightPage.module.css"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import TopHistoryNav from "../../TopNav/TopHistoryNav"
import TheSlider from "../../SignUpPage/TheSlider/TheSlider"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { instance } from "../../../api/index"
import { registerUserInfo } from "../../../store/userSlice"
import { useHistory } from "react-router-dom"

function ModAgePage() {
  const userInfo = useSelector((state) => state.user.userInfo)
  const [age, setAge] = useState(null)
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
    setAge(userInfo.age)
  }, [userInfo])

  return (
    <div>
      {age ? (
        <div>
          <div id="top_nav_area">
            <TopHistoryNav></TopHistoryNav>
          </div>
          <div style={{ marginTop: "15vh", fontSize: "2.0rem" }}>
            (만)나이 수정
          </div>
          <TheSlider
            type={"age"}
            range={[10, 80]}
            value={age}
            setValue={(value) => {
              setAge(value)
            }}
            term={0.5}
          />
          <div
            onClick={() => {
              instance
                .put("/user", { ..._userInfo, age: age }, {})
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

export default ModAgePage
