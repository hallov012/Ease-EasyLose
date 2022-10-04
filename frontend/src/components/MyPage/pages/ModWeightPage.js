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

function ModWeightPage() {
  const userInfo = useSelector((state) => state.user.userInfo)
  const [weight, setWeight] = useState(null)
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
    setWeight(userInfo.weight)
  }, [userInfo])

  return (
    <div>
      {weight ? (
        <div>
          <div id="top_nav_area">
            <TopHistoryNav></TopHistoryNav>
          </div>
          <div
            style={{
              marginTop: "15vh",
              fontSize: "2.0rem",
              fontWeight: "bold",
            }}
          >
            몸무게 수정
          </div>
          <TheSlider
            type={"weight"}
            range={[30, 120]}
            value={weight}
            setValue={(value) => {
              setWeight(value)
            }}
            term={0.5}
          />
          <div
            onClick={() => {
              instance
                .put("/user", { ..._userInfo, weight: weight }, {})
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

export default ModWeightPage
