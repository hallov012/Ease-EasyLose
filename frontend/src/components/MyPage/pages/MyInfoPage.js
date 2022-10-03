import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import classes from "./MyInfoPage.module.css"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { instance } from "../../../api"

function MyInfoPage() {
  const userInfo = useSelector((state) => state.user.userInfo)
  const history = useHistory()

  const MySwal = withReactContent(Swal)

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
        <div className={classes.container}>
          <div className={classes.title}>마이페이지</div>
          <div className={classes.box}>
            <div className={classes.boxTitle}>
              <div style={{ fontSize: 16, fontWeight: 1000 }}>내 정보</div>
              <div
                onClick={() => {
                  history.push("/mypage/mod")
                }}
                style={{ fontSize: 14, color: "var(--main-color)" }}
              >
                편집
              </div>
            </div>
            <div className={classes.boxinfo}>
              <div className={classes.boxicon}>
                <i className="fa-solid fa-user"></i>
              </div>
              <div className={classes.userinfo}>
                <div className={classes.user_info_item}>
                  <div>나이</div>
                  <div>{userInfo.age}</div>
                </div>
                <div className={classes.user_info_item}>
                  <div>체중</div>
                  <div>{userInfo.weight}kg</div>
                </div>
                <div className={classes.user_info_item}>
                  <div>신장</div>
                  <div>{userInfo.height}cm</div>
                </div>
              </div>
            </div>
            <div>
              <div className={classes.activity_and_goal}>
                <i className="fa-solid fa-person-running"></i>
                <div style={{ marginLeft: "2vw" }}>
                  {showActivity(userInfo.activityLevel)}
                </div>
              </div>
              <div className={classes.activity_and_goal}>
                <i className="fa-solid fa-seedling"></i>
                <div style={{ marginLeft: "2vw" }}>
                  {showGoal(userInfo.goal)}
                </div>
              </div>
            </div>
            <div className={classes.itemList}>
              <div className={classes.item}>
                <div style={{ fontWeight: 1000 }}>칼로리</div>
                <div>{userInfo.dailyCalorie}kcal</div>
              </div>
              <div className={classes.item}>
                <div style={{ fontWeight: 1000 }}>탄수화물</div>
                <div>{userInfo.dailyCarb}g</div>
              </div>
              <div className={classes.item}>
                <div style={{ fontWeight: 1000 }}>단백질</div>
                <div>{userInfo.dailyProtein}g</div>
              </div>
              <div className={classes.item}>
                <div style={{ fontWeight: 1000 }}>지방</div>
                <div>{userInfo.dailyFat}g</div>
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              localStorage.clear()
              MySwal.fire({
                icon: "success",
                title: "성공적으로 로그아웃 되었습니다!",
                showConfirmButton: false,
                timer: 1500,
              })
              history.push("/")
            }}
            className={classes.box_logout}
          >
            <div>로그아웃</div>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
          <div
            onClick={() => {
              MySwal.fire({
                title: "정말 탈퇴하시겠습니까?",
                text: "가지고 있던 기록들이 모두 사라집니다.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "탈퇴하겠습니다!",
                cancelButtonText: "취소",
              }).then((result) => {
                if (result.isConfirmed) {
                  instance
                    .delete("/user", {})
                    .then((response) => {
                      MySwal.fire({
                        icon: "success",
                        title: "성공적으로 탈퇴되었습니다!",
                        showConfirmButton: false,
                        timer: 1500,
                      })
                      localStorage.clear()
                      history.push("/")
                    })
                    .catch((error) => console.log(error))
                }
              })
            }}
            className={classes.box_logout}
          >
            <div>회원탈퇴</div>
            <i className="fa-solid fa-ghost"></i>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MyInfoPage
