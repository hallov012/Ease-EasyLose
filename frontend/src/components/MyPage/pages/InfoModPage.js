import classes from "./InfoModPage.module.css"
import NutrientChart from "../../MainPage/NutrientChart/NutrientChart"
import { useHistory } from "react-router-dom"
import TopHistoryNav from "../../TopNav/TopHistoryNav"
import { useSelector } from "react-redux"

function InfoModPage() {
  const userInfo = useSelector((state) => state.user.userInfo)
  const history = useHistory()
  const colorSet = {
    carbColor: "#afb4ff",
    proteinColor: "#7c83fd",
    fatColor: "#b1e1ff",
  }

  function showGoal(goal) {
    if (goal === "DIET") return "체중 감량을 목표로 합니다"
    else if (goal === "KEEP") return "체중 유지를 목표로 합니다"
    else return "체중 증가를 목표로 합니다"
  }

  function showActivity(act) {
    if (act === "LOWEST") return "30분 이하의 아주 가벼운 활동"
    else if (act === "LOW") return "1~2시간 사이의 가벼운 활동"
    else if (act === "HIGH") return "2~4시간 사이의 보통 활동"
    else return "4시간 이상의 심한 활동"
  }

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
                    <i className="fa-solid fa-pen"></i>
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
                    <i className="fa-solid fa-pen"></i>
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
                    <i className="fa-solid fa-pen"></i>
                  </div>
                </div>
              </div>
              <div className={classes.mod_item}>
                <div>운동량</div>
                <div className={classes.value_and_button}>
                  <div>{showActivity(userInfo.activityLevel)}</div>
                  <div
                    onClick={() => {
                      history.push("/mypage/mod/activity")
                    }}
                    style={{ marginLeft: "3vw" }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </div>
                </div>
              </div>
              <div className={classes.mod_item}>
                <div>설정 목표</div>
                <div className={classes.value_and_button}>
                  <div>{showGoal(userInfo.goal)}</div>
                  <div
                    onClick={() => {
                      history.push("/mypage/mod/goal")
                    }}
                    style={{ marginLeft: "3vw" }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.chart}>
              <NutrientChart
                dietSum={{
                  carb: userInfo.dailyCarb,
                  protein: userInfo.dailyProtein,
                  fat: userInfo.dailyFat,
                }}
                colorSet={colorSet}
              ></NutrientChart>
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
          <div>
            <div
              className={classes.initialize_percent_button}
              onClick={() => {
                history.push("/mypage/mod/nut")
              }}
            >
              섭취 기준 수정 <i className="fa-solid fa-pen"></i>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default InfoModPage
