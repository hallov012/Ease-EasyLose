import TopNav from "../components/TopNav/TopNav";
import { Route, Switch, useLocation } from "react-router-dom";
import SignUpHeader from "../components/SignUpPage/SignUpHeader/SignUpHeader";
import { useEffect, useState } from "react";
import GenderPicker from "../components/SignUpPage/GenderPicker/GenderPicker";
import BirthPicker from "../components/SignUpPage/BirthPicker/BirthPicker";
import HeightPicker from "../components/SignUpPage/HeightPicker/HeightPicker";
import WeightPicker from "../components/SignUpPage/WeightPicker/WeightPicker";
import ActivityPicker from "../components/SignUpPage/ActivityPicker/ActivityPicker";
import GoalPicker from "../components/SignUpPage/GoalPicker/GoalPicker";
import PickComplete from "../components/SignUpPage/PickComplete/PickComplete";
import { useDispatch, useSelector } from "react-redux";
import { registerUserInfo } from "../store/userSlice";
import { useHistory } from "react-router-dom";
import axios from "axios";
function SignUpPage() {
  const location = useLocation().pathname.replace("/signup", "");
  const [userGender, setUserGender] = useState("");
  const [userBirth, setUserBirth] = useState("20000101");
  const [userWeight, setUserWeight] = useState(70);
  const [userHeight, setUserHeight] = useState(180);
  const [userActivity, setUserActivity] = useState(5);
  const [userGoal, setUserGoal] = useState(5);
  const history = useHistory();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);

  function putUserInfo() {
    axios
      .put(
        `https://j7a704.p.ssafy.io/api/v1/user`,
        {
          gender: userGender,
          activityLevel: userActivity,
          goal: userGoal,
          weight: userWeight,
          height: userHeight,
          birthdate: userBirth,
          isAutomatic: true,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log(response);
        axios
          .get(`https://j7a704.p.ssafy.io/api/v1/user`, {})
          .then((response) => {
            console.log(`회원가입 완료: ${response.data}`);
            dispatch(registerUserInfo(response.data));
          });
        history.push("/main");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log(
    `${userGender}/${userBirth}/${userWeight}kg/${userHeight}cm/${userActivity}/${userGoal}`
  );

  const informationMap = new Map();
  informationMap.set("/gender", {
    title: "성별",
    subtitle: "맞춤 추천을 위한 정보를 요청드립니다!",
    done: "0",
  });
  informationMap.set("/birth", {
    title: "생일",
    subtitle: "맞춤 추천을 위한 정보를 요청드립니다!",
    done: "16",
  });
  informationMap.set("/height", {
    title: "키",
    subtitle: "맞춤 추천을 위한 정보를 요청드립니다!",
    done: "32",
  });
  informationMap.set("/weight", {
    title: "몸무게",
    subtitle: "맞춤 추천을 위한 정보를 요청드립니다!",
    done: "48",
  });
  informationMap.set("/activity", {
    title: "활동량",
    subtitle: "하루 활동량을 기준으로 선택해주세요!",
    done: "64",
  });
  informationMap.set("/goal", {
    title: "목표",
    subtitle: "선택하실 목표에 맞게 영양 비율을 추천해드립니다!",
    done: "80",
  });
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
  });

  function setArrow() {
    if (location === "/gender") {
      if (userGender === "") {
        return ["", ""];
      } else {
        return ["", "/signup/birth"];
      }
    } else if (location === "/activity") {
      if (userActivity === 5) {
        return ["/signup/weight", ""];
      } else {
        return ["/signup/weight", "/signup/goal"];
      }
    } else if (location === "/goal") {
      if (userGoal === 5) {
        return ["/signup/activity", ""];
      } else {
        return ["/signup/activity", "/signup/complete"];
      }
    } else if (location === "/height") {
      return ["/signup/birth", "/signup/weight"];
    } else if (location === "/weight") {
      return ["/signup/height", "/signup/activity"];
    } else if (location === "/birth") {
      return ["/signup/gender", "/signup/height"];
    } else {
      return ["", ""];
    }
  }

  function renderSignUpPage() {
    const temp = informationMap.get(location);
    return (
      <div>
        <div id="top_nav_area">
          <TopNav text="" arrow={setArrow()}></TopNav>
        </div>
        <SignUpHeader
          title={temp.title}
          done={temp.done}
          subtitle={temp.subtitle}
        ></SignUpHeader>
        <Switch>
          <Route path="/signup/gender">
            <GenderPicker
              value={userGender}
              setGender={(value) => {
                setUserGender(value);
                // setUserInfo((current) => {
                //   let newObject = { ...current };
                //   newObject["gender"] = value;
                //   return newObject;
                // });
              }}
            ></GenderPicker>
          </Route>
          <Route path="/signup/height">
            <HeightPicker
              value={userHeight}
              setHeight={(value) => {
                setUserHeight(value);
              }}
            ></HeightPicker>
          </Route>
          <Route path="/signup/weight">
            <WeightPicker
              value={userWeight}
              setWeight={(value) => {
                setUserWeight(value);
              }}
            ></WeightPicker>
          </Route>
          <Route path="/signup/birth">
            <BirthPicker
              value={userBirth}
              setBirth={(value) => {
                setUserBirth(value);
                // setUserInfo((current) => {
                //   let newObject = { ...current };
                //   newObject["birth"] = value;
                //   return newObject;
                // });
              }}
            ></BirthPicker>
          </Route>
          <Route path="/signup/activity">
            <ActivityPicker
              value={userActivity}
              setValue={(value) => {
                setUserActivity(value);
              }}
            ></ActivityPicker>
          </Route>
          <Route path="/signup/goal">
            <GoalPicker
              value={userGoal}
              setValue={(value) => {
                setUserGoal(value);
              }}
            ></GoalPicker>
          </Route>
          <Route path="/signup/complete">
            <PickComplete
              putUserInfo={() => {
                putUserInfo();
              }}
            ></PickComplete>
          </Route>
        </Switch>
      </div>
    );
  }

  return <div>{renderSignUpPage()}</div>;
}

export default SignUpPage;
