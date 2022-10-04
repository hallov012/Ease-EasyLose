import classes from "./ModActivityLevelPage.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TopHistoryNav from "../../TopNav/TopHistoryNav";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { instance } from "../../../api/index";
import { registerUserInfo } from "../../../store/userSlice";
import { useHistory } from "react-router-dom";
import {
  faPersonWalking,
  faChair,
  faRunning,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModActivityLevelPage() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [act, setAct] = useState(null);
  const [selected, setSelected] = useState([false, false, false, false]);
  const history = useHistory();

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
  };

  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  useEffect(() => {
    setAct(userInfo.activityLevel);
    if (userInfo.activityLevel === "LOWEST")
      setSelected([true, false, false, false]);
    else if (userInfo.activityLevel === "LOW")
      setSelected([false, true, false, false]);
    else if (userInfo.activityLevel === "HIGH")
      setSelected([false, false, true, false]);
    else setSelected([false, false, false, true]);
  }, [userInfo]);

  const array = [
    {
      icon: faChair,
      explanation: "30분 이하의 아주 가벼운 활동",
      value: "LOWEST",
    },
    {
      icon: faPersonWalking,
      explanation: "1~2시간 사이의 가벼운 활동",
      value: "LOW",
    },
    { icon: faRunning, explanation: "2~4시간 사이의 보통 활동", value: "HIGH" },
    {
      icon: faDumbbell,
      explanation: "4시간 이상의 심한 활동",
      value: "HIGHEST",
    },
  ];

  return (
    <div>
      {act ? (
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
            활동량 수정
          </div>
          <div className={classes.container}>
            {array.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setAct(array[index].value);
                    setSelected(() => {
                      const newArray = [false, false, false, false];
                      newArray[index] = true;
                      return newArray;
                    });
                  }}
                  className={
                    selected[index] ? classes.pickedItem : classes.activityItem
                  }
                >
                  <div
                    style={{
                      marginLeft: "3vw",
                      fontSize: "36px",
                      marginRight: "3vw",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      fixedWidth
                    ></FontAwesomeIcon>
                  </div>
                  <span>{item.explanation}</span>
                </div>
              );
            })}
          </div>
          <div
            onClick={() => {
              instance
                .put("/user", { ..._userInfo, activityLevel: act }, {})
                .then((response) => {
                  dispatch(registerUserInfo(response.data));
                  MySwal.fire({
                    icon: "success",
                    text: "성공적으로 수정되었습니다!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  history.goBack();
                });
            }}
            className={classes.addButtonContainer}
          >
            <div className={classes.addButton}>수정하기</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ModActivityLevelPage;
