import classes from "./PickComplete.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCheck } from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

import Loader from "../Loader/Loader"
import Confetti from "../Confetti/Confetti"
import logo from "../../../assets/Logo/logo_background.png"

function PickComplete({ putUserInfo }) {
  const [load, setLoad] = useState(true)
  setInterval(() => {
    setLoad(false)
  }, 5000)
  const history = useHistory()
  useEffect(() => {
    putUserInfo()
  }, [])
  const userInfo = useSelector((state) => state.user.userInfo)
  return (
    <div className={`${classes.container} gradient_color__vertical`}>
      {load ? <Loader /> : null}
      <Confetti />
      {/* <FontAwesomeIcon icon={faUserCheck} size="5x"></FontAwesomeIcon> */}
      <img
        className={classes.logo}
        src={logo}
        alt="?"
        style={{ width: "50vw" }}
      />
      <div className={classes.text}>
        <div>회원님이 입력한 정보를 토대로</div>
        <div>다음과 같이 일일 영양소가 추천되었습니다.</div>
        <div>Ease와 함께 목표를 향한 여정을 시작해보세요!</div>
      </div>
      {userInfo ? (
        <div className={classes.itemList}>
          <div className={classes.item}>
            <div>칼로리</div>
            <div>{userInfo.dailyCalorie}kcal</div>
          </div>
          <div className={classes.item}>
            <div>탄수화물</div>
            <div>{userInfo.dailyCarb}g</div>
          </div>
          <div className={classes.item}>
            <div>단백질</div>
            <div>{userInfo.dailyProtein}g</div>
          </div>
          <div className={classes.item}>
            <div>지방</div>
            <div>{userInfo.dailyFat}g</div>
          </div>
        </div>
      ) : null}
      <div>
        <div
          className={classes.button}
          onClick={() => {
            history.push("/mypage/mod/nut")
          }}
        >
          일일 영양소 수정하기
        </div>
        <div
          className={classes.button}
          style={{
            background:
              "linear-gradient(90deg,var(--main-color) 44%,var(--light-color) 88%)",
          }}
          onClick={() => {
            history.push("/main")
          }}
        >
          시작하기
        </div>
      </div>
    </div>
  )
}

export default PickComplete
