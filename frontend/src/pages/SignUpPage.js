import TopNav from "../components/TopNav/TopNav";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import SignUpHeader from "../components/SignUpPage/SignUpHeader/SignUpHeader";
import { useState } from "react";

function SignUpPage() {
  const location = useLocation().pathname.replace("/signup", "");
  const [currentPageInfo, setCurrentPageInfo] = useState(null);

  const infoMap = new Map();
  infoMap.set("", {
    title: "응애",
    subtitle: "되나?",
    notice: "되면 대박",
    arrow: ["", "/signup/gender"],
    done: "0",
  });
  infoMap.set("/gender", {
    title: "성별 입력",
    subtitle: "회원님의 성별을 입력해주세요",
    notice: "맞춤 추천을 위한 성별을 입력해주세요",
    arrow: ["", "/signup/birth"],
    done: "10",
  });
  infoMap.set("/birth", {
    title: "생일 입력",
    subtitle: "회원님의 생일을 입력해주세요",
    notice: "맞춤 추천을 위한 생일을 입력해주세요",
    arrow: ["/signup/gender", "/signup/height"],
    done: "25",
  });
  infoMap.set("/height", {
    title: "신장 입력",
    subtitle: "회원님의 신장을 입력해주세요",
    notice: "맞춤 추천을 위한 신장을 입력해주세요",
    arrow: ["/signup/birth", "/signup/weight"],
    done: "40",
  });
  infoMap.set("/weight", {
    title: "몸무게 입력",
    subtitle: "회원님의 몸무게을 입력해주세요",
    notice: "맞춤 추천을 위한 몸무게을 입력해주세요",
    arrow: ["/signup/height", "/signup/amountOfActivity"],
    done: "55",
  });
  infoMap.set("/amountOfActivity", {
    title: "활동량 입력",
    subtitle: "회원님의 활동량을 입력해주세요",
    notice: "맞춤 추천을 위한 활동량을 입력해주세요",
    arrow: ["/signup/weight", "/signup/goal"],
    done: "70",
  });
  infoMap.set("/goal", {
    title: "목표 입력",
    subtitle: "회원님의 목표를 입력해주세요",
    notice: "맞춤 추천을 위한을 목표를 입력해주세요",
    arrow: ["/signup/amountOfActivity", ""],
    done: "85",
  });
  infoMap.set("/complete", {
    title: "끝",
    subtitle: "끝났어요",
    notice: "완료됨ㅋ",
    arrow: ["", ""],
    done: "100",
  });

  function renderSignUpPage() {
    const temp = infoMap.get(location);
    return (
      <div>
        <div id="top_nav_area">
          <TopNav text="" arrow={temp.arrow}></TopNav>
        </div>
        <SignUpHeader
          title={temp.title}
          subtitle={temp.subtitle}
          notice={temp.notice}
          done={temp.done}
        ></SignUpHeader>
        <Switch>
          <Route path="/signup" exact>
            <h1>정보를 입력해보아요~</h1>
          </Route>
          <Route path="/signup/gender">
            <h1>Gender Component</h1>
          </Route>
          <Route path="/signup/height">
            <h1>Height Component</h1>
          </Route>
          <Route path="/signup/weight">
            <h1>Weight Component</h1>
          </Route>
          <Route path="/signup/birth">
            <h1>Birth Component</h1>
          </Route>
          <Route path="/signup/amountOfActivity">
            <h1>Amount of Activity Component</h1>
          </Route>
          <Route path="/signup/goal">
            <h1>Goal Component</h1>
          </Route>
          <Route path="/signup/complete">
            <h1>Complete Component</h1>
          </Route>
        </Switch>
      </div>
    );
  }

  return <div>{renderSignUpPage()}</div>;
}

export default SignUpPage;
