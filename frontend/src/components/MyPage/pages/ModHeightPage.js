import classes from "./ModHeightPage.module.css";
import { useState } from "react";
import TopNav from "../../TopNav/TopNav";

function ModHeightPage({ height }) {
  const [_height, _setHeight] = useState(height);
  return (
    <div>
      <div id="top_nav_area">
        <TopNav text="" arrow={["/mypage/mod", ""]}></TopNav>
      </div>
      <div className={classes.container}>
        <div>키 수정</div>
        <div>맞춤 추천을 위한 정보를 요청드립니다!</div>
        <div>
          <input
            value={_height}
            onChange={(e) => {
              _setHeight(e.target.value);
            }}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default ModHeightPage;
