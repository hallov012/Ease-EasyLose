import classes from "./ModWeightPage.module.css";
import TopNav from "../../TopNav/TopNav";
import { useState } from "react";

function ModWeightPage({ weight }) {
  const [_weight, _setWeight] = useState(weight);

  return (
    <div>
      <div id="top_nav_area">
        <TopNav text="" arrow={["/mypage/mod", ""]}></TopNav>
      </div>
      <div className={classes.container}>
        <div>몸무게 수정</div>
        <div>맞춤 추천을 위한 정보를 요청드립니다!</div>
        <div>
          <input
            value={_weight}
            onChange={(e) => {
              _setWeight(e.target.value);
            }}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default ModWeightPage;
