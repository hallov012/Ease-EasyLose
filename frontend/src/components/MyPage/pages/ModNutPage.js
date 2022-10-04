import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import classes from "./ModNutPage.module.css"
import { registerUserInfo } from "../../../store/userSlice"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useSelector } from "react-redux"
import TopNav from "../../TopNav/TopNav"
import { instance } from "../../../api/index"
import { useEffect, useState } from "react"
import Slider from "@mui/material/Slider"
import { styled } from "@mui/material/styles"

const PrettoSlider = styled(Slider)({
  color: "#7c83fd",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 15,
    background: "unset",
    padding: 0,
    width: 40,
    height: 40,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#7c83fd",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
})

const minDistance = 10

function ModNutPage() {
  const userInfo = useSelector((state) => state.user.userInfo)
  const [calorie, setCalorie] = useState(0)
  const [boundary, setBoundary] = useState([20, 37])
  const [carb, setCarb] = useState(0)
  const [protein, setProtein] = useState(0)
  const [fat, setFat] = useState(0)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (userInfo) {
      setCalorie(userInfo.dailyCalorie)
      setCarb(userInfo.dailyCarb)
      setProtein(userInfo.dailyProtein)
      setFat(userInfo.dailyFat)
      const b1 = Math.round(
        ((userInfo.dailyCarb * 4) / userInfo.dailyCalorie) * 100
      )
      const b2 =
        b1 +
        Math.round(((userInfo.dailyProtein * 4) / userInfo.dailyCalorie) * 100)
      setBoundary([b1, b2])
    }
  }, [userInfo])

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

  function initializePercent() {
    MySwal.fire({
      title: "추천 수치로 변경하시겠습니까?",
      text: "회원님의 정보를 바탕으로 조정해드립니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c83fd",
      cancelButtonColor: "#00033f",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        instance
          .put(
            "/user",
            {
              ..._userInfo,
              isAutomatic: true,
            },
            {}
          )
          .then((response) => {
            dispatch(registerUserInfo(response.data))
            MySwal.fire({
              icon: "success",
              text: "성공적으로 수정되었습니다!",
              showConfirmButton: false,
              timer: 1500,
            })
            history.goBack()
          })
      }
    })
  }

  const MySwal = withReactContent(Swal)

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setBoundary([
        Math.min(newValue[0], boundary[1] - minDistance),
        boundary[1],
      ])
    } else {
      setBoundary([
        boundary[0],
        Math.max(newValue[1], boundary[0] + minDistance),
      ])
    }
  }

  useEffect(() => {
    setCarb(Math.round((calorie * boundary[0]) / 100 / 4))
    setProtein(Math.round((calorie * (boundary[1] - boundary[0])) / 100 / 4))
    setFat(Math.round((calorie * (100 - boundary[1])) / 100 / 8))
  }, [boundary, calorie])

  console.log(`${carb}/${protein}/${fat}`)

  return (
    <div>
      {calorie ? (
        <div>
          <div id="top_nav_area">
            <TopNav arrow={["/mypage/mod", ""]}></TopNav>
          </div>
          <div
            style={{
              marginTop: "15vh",
              fontSize: "2.0rem",
              marginBottom: "1vh",
              fontWeight: "bold",
            }}
          >
            섭취 기준 세부 수정
          </div>
          <div className={classes.container}>
            <div>
              <div
                style={{
                  fontSize: "1.3rem",
                  marginBottom: "1vh",
                  fontWeight: "bold",
                }}
              >{`섭취 칼로리`}</div>
              <div
                style={{ fontSize: "1.1rem", marginBottom: "3vh" }}
              >{`${calorie} kcal`}</div>
            </div>

            <div style={{ width: "80%" }}>
              <PrettoSlider
                valueLabelDisplay="on"
                aria-label="pretto slider"
                value={calorie}
                step={50}
                min={1000}
                max={4000}
                onChange={(e) => {
                  setCalorie(e.target.value)
                }}
              />
            </div>
            <div style={{ marginBottom: "3vh" }}>
              <div
                style={{
                  fontSize: "1.3rem",
                  marginBottom: "1vh",
                  fontWeight: "bold",
                }}
              >{`섭취 영양소 비율`}</div>
              <div className={classes.nutrient_percent_text}>
                <div>{`탄수화물: ${boundary[0]}%`}</div>
                <div>{`단백질: ${boundary[1] - boundary[0]}%`}</div>
                <div>{`지방: ${100 - boundary[1]}%`}</div>
              </div>
            </div>

            <div style={{ width: "80%" }}>
              <PrettoSlider
                getAriaLabel={() => "Minimum distance"}
                value={boundary}
                onChange={handleChange1}
                valueLabelDisplay="on"
                getAriaValueText={(value) => {
                  return value
                }}
                disableSwap
              />
            </div>
          </div>
          <div className={classes.initcontainer}>
            <div
              onClick={initializePercent}
              className={classes.initialize_percent_button}
            >
              추천 수치로 초기화하기
            </div>
          </div>

          <div
            onClick={() => {
              instance
                .put(
                  "/user",
                  {
                    ..._userInfo,
                    dailyCalorie: calorie,
                    dailyCarb: carb,
                    dailyProtein: protein,
                    dailyFat: fat,
                    isAutomatic: false,
                  },
                  {}
                )
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

export default ModNutPage
