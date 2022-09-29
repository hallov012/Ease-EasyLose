import classes from "./UserInfoBox.module.css"
import { NavLink } from "react-router-dom"

function UserInfoBox(props) {
  console.log(props.userInfo)
  return (
    <div className={classes.info_area}>
      <div className={classes.top_area}>
        <span>내 정보</span>
        <NavLink to="/mypage/mod">
          <div>수정</div>
        </NavLink>
      </div>
      <div className={classes.info_box__total}>
        <i class="fa-solid fa-person"></i>
        <div className={classes.info_box}>
          <div className={classes.info_item}>
            <span>체중</span>
            <span>{props.userInfo.weight}kg</span>
          </div>
          <div className={classes.info_item}>
            <span>신장</span>
            <span>{props.userInfo.height}cm</span>
          </div>
          <div className={classes.info_item}>
            <span>나이</span>
            <span>(만){props.userInfo.age}세</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserInfoBox
