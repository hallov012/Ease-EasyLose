import TopNav from "../components/TopNav/TopNav"
import { Route, Switch, useLocation } from "react-router-dom"
import SignUpHeader from "../components/SignUpPage/SignUpHeader/SignUpHeader"
import { useEffect, useState } from "react"
import GenderPicker from "../components/SignUpPage/GenderPicker/GenderPicker"
import ActivityPicker from "../components/SignUpPage/ActivityPicker/ActivityPicker"
import GoalPicker from "../components/SignUpPage/GoalPicker/GoalPicker"
import PickComplete from "../components/SignUpPage/PickComplete/PickComplete"
import TheSlider from "../components/SignUpPage/TheSlider/TheSlider"
import { useDispatch, useSelector } from "react-redux"
import { registerUserInfo } from "../store/userSlice"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { instance } from "../api/index"
function SignUpPage() {
  const location = useLocation().pathname.replace("/signup", "")
  const [userGender, setUserGender] = useState("")
  const [userAge, setUserAge] = useState(20)
  const [userWeight, setUserWeight] = useState(50)
  const [userHeight, setUserHeight] = useState(165)
  const [userActivity, setUserActivity] = useState("")
  const [userGoal, setUserGoal] = useState("")
  const history = useHistory()
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.user.accessToken)

  function putUserInfo() {
    instance
      .put(
        "/user",
        {
          gender: userGender,
          activityLevel: userActivity,
          goal: userGoal,
          weight: userWeight,
          height: userHeight,
          age: userAge,
          isAutomatic: true,
        },
        {}
      )
      .then((response) => {
        instance
          .get("/user", {})
          .then((response) => {
            dispatch(registerUserInfo(response.data))
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  console.log(
    `${userGender}/${userAge}/${userWeight}kg/${userHeight}cm/${userActivity}/${userGoal}`
  )

  const informationMap = new Map()
  informationMap.set("/gender", {
    title: "성별",
    subtitle: "맞춤 추천을 위한 정보를 요청드립니다!",
    done: "0",
    icon: "fa-solid fa-venus-mars",
  })
  informationMap.set("/age", {
    title: "나이",
    subtitle: "맞춤 추천을 위한 정보를 요청드립니다!",
    done: "16",
    icon: "fa-solid fa-cake-candles",
  })
  informationMap.set("/height", {
    title: "키",
    subtitle: "맞춤 추천을 위한 정보를 요청드립니다!",
    done: "32",
    icon: "fa-solid fa-ruler-vertical",
  })
  informationMap.set("/weight", {
    title: "몸무게",
    subtitle: "맞춤 추천을 위한 정보를 요청드립니다!",
    done: "48",
    icon: "fa-solid fa-weight-scale",
  })
  informationMap.set("/activity", {
    title: "활동량",
    subtitle: "하루 활동량을 기준으로 선택해주세요!",
    done: "64",
    icon: "fa-solid fa-person-running",
  })
  informationMap.set("/goal", {
    title: "목표",
    subtitle: "선택하실 목표에 맞게 영양 비율을 추천해드립니다!",
    done: "80",
    icon: "fa-solid fa-child-reaching",
  })
  // informationMap.set("/verify", {
  //   title: "입력 확인",
  //   subtitle: "보다 정확한 추천을 위해 입력 내역을 확인해주세요!",
  //   arrow: ["", ""],
  //   done: "100",
  // });
  informationMap.set("/complete", {
    title: "수고하셨습니다!",
    subtitle: "",
    done: "100",
  })

  function setArrow() {
    if (location === "/gender") {
      return ["", ""]
    } else if (location === "/activity") {
      return ["/signup/weight", ""]
    } else if (location === "/goal") {
      return ["/signup/activity", ""]
    } else if (location === "/height") {
      return ["/signup/age", ""]
    } else if (location === "/weight") {
      return ["/signup/height", ""]
    } else if (location === "/age") {
      return ["/signup/gender", ""]
    } else {
      return ["", ""]
    }
  }

  function renderSignUpPage() {
    const temp = informationMap.get(location)
    return (
      <div>
        <div id="top_nav_area">
          <TopNav text="" arrow={setArrow()}></TopNav>
        </div>
        <div style={{ width: "100%", marginTop: "9vh" }}>
          <SignUpHeader
            title={temp.title}
            done={temp.done}
            subtitle={temp.subtitle}
            icon={temp.icon}
          ></SignUpHeader>
          <Switch>
            <Route path="/signup/gender">
              <GenderPicker
                value={userGender}
                setGender={(value) => {
                  setUserGender(value)
                  // setUserInfo((current) => {
                  //   let newObject = { ...current };
                  //   newObject["gender"] = value;
                  //   return newObject;
                  // });
                }}
              ></GenderPicker>
            </Route>
            <Route path="/signup/height">
              <TheSlider
                type={"height"}
                range={[130, 210]}
                value={userHeight}
                setValue={(value) => {
                  setUserHeight(value)
                }}
                term={0.5}
              />
            </Route>
            <Route path="/signup/weight">
              <TheSlider
                type={"weight"}
                range={[30, 120]}
                value={userWeight}
                setValue={(value) => {
                  setUserWeight(value)
                }}
                term={0.5}
              />
            </Route>
            <Route path="/signup/age">
              <TheSlider
                type={"age"}
                range={[10, 80]}
                value={userAge}
                setValue={(value) => {
                  setUserAge(value)
                }}
                term={1}
              />
            </Route>
            <Route path="/signup/activity">
              <ActivityPicker
                value={userActivity}
                setValue={(value) => {
                  setUserActivity(value)
                }}
              ></ActivityPicker>
            </Route>
            <Route path="/signup/goal">
              <GoalPicker
                value={userGoal}
                setValue={(value) => {
                  setUserGoal(value)
                }}
              ></GoalPicker>
            </Route>
            <Route path="/signup/complete">
              <PickComplete
                putUserInfo={() => {
                  if (userGoal !== "") putUserInfo()
                }}
              ></PickComplete>
            </Route>
          </Switch>
        </div>
      </div>
    )
  }

  return <div>{renderSignUpPage()}</div>
}

export default SignUpPage
