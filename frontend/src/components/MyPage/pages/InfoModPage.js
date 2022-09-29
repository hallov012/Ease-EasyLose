import classes from "./InfoModPage.module.css"
import NutrientChart from "../../MainPage/NutrientChart/NutrientChart"
import { useHistory } from "react-router-dom"
import TopHistoryNav from "../../TopNav/TopHistoryNav"
import { useSelector } from "react-redux"

function InfoModPage() {
  const userInfo = useSelector((state) => state.user.userInfo)
  const history = useHistory()

  return (
    <div>
      {userInfo ? (
        <div>
          <div id="top_nav_area">
            <TopHistoryNav></TopHistoryNav>
          </div>
          <div className={classes.container}>
            <div className={classes.mod_list}>
              <div className={classes.mod_item}>
                <div>나이</div>
                <div className={classes.value_and_button}>
                  <div>{userInfo.age}세</div>
                  <div
                    onClick={() => {
                      history.push("/mypage/mod/age")
                    }}
                    style={{ marginLeft: "3vw" }}
                  >
                    <i class="fa-solid fa-pen"></i>
                  </div>
                </div>
              </div>
              <div className={classes.mod_item}>
                <div>체중</div>
                <div className={classes.value_and_button}>
                  <div>{userInfo.weight}kg</div>
                  <div
                    onClick={() => {
                      history.push("/mypage/mod/weight")
                    }}
                    style={{ marginLeft: "3vw" }}
                  >
                    <i class="fa-solid fa-pen"></i>
                  </div>
                </div>
              </div>
              <div className={classes.mod_item}>
                <div>신장</div>
                <div className={classes.value_and_button}>
                  <div>{userInfo.height}cm</div>
                  <div
                    onClick={() => {
                      history.push("/mypage/mod/height")
                    }}
                    style={{ marginLeft: "3vw" }}
                  >
                    <i class="fa-solid fa-pen"></i>
                  </div>
                </div>
              </div>
              <div className={classes.mod_item}>
                <div>운동량</div>
                <div className={classes.value_and_button}>
                  <div>{userInfo.activityLevel}</div>
                  <div
                    onClick={() => {
                      history.push("/mypage/mod/activity")
                    }}
                    style={{ marginLeft: "3vw" }}
                  >
                    <i class="fa-solid fa-pen"></i>
                  </div>
                </div>
              </div>
              <div className={classes.mod_item}>
                <div>설정 목표</div>
                <div className={classes.value_and_button}>
                  <div>{userInfo.goal}</div>
                  <div
                    onClick={() => {
                      history.push("/mypage/mod/goal")
                    }}
                    style={{ marginLeft: "3vw" }}
                  >
                    <i class="fa-solid fa-pen"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.chart}>
              <NutrientChart></NutrientChart>
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
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default InfoModPage
