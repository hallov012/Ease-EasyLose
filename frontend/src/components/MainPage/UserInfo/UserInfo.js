import classes from "./UserInfo.module.css"

function UserInfo() {
  return (
    <div className={classes.info_area}>
      <div className={classes.top_area}>
        <span>내 정보</span>
        <div>수정</div>
      </div>
      <div className={classes.info_box__total}>
        <i class="fa-solid fa-person"></i>
        <div className={classes.info_box}>
          <div className={classes.info_item}>
            <span>체중</span>
            <span>56.5kg</span>
          </div>
          <div className={classes.info_item}>
            <span>신장</span>
            <span>162cm</span>
          </div>
          <div className={classes.info_item}>
            <span>BMI</span>
            <span>21.53</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserInfo
