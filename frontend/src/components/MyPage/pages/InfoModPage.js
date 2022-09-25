import classes from "./InfoModPage.module.css";
import TopNav from "../../TopNav/TopNav";
import NutrientChart from "../../MainPage/NutrientChart/NutrientChart";
import { NavLink } from "react-router-dom";

function InfoModPage() {
  return (
    <div>
      <div id="top_nav_area">
        <TopNav text="" arrow={["/mypage", ""]}></TopNav>
      </div>
      <div className={classes.container}>
        <div className={classes.mod_list}>
          <div className={classes.mod_item}>
            <div>나이</div>
            <div className={classes.value_and_button}>
              <div>23세</div>
              <div style={{ marginLeft: "2vw" }}>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </div>
          <div className={classes.mod_item}>
            <div>체중</div>
            <div className={classes.value_and_button}>
              <div>56.6kg</div>
              <div style={{ marginLeft: "2vw" }}>
                <i class="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </div>
          <div className={classes.mod_item}>
            <div>신장</div>
            <div className={classes.value_and_button}>
              <div>162cm</div>
              <div style={{ marginLeft: "2vw" }}>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </div>
          <div className={classes.mod_item}>
            <div>운동량</div>
            <div className={classes.value_and_button}>
              <div>2~4시간 사이의 보통 활동</div>
              <div style={{ marginLeft: "2vw" }}>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </div>
          <div className={classes.mod_item}>
            <div>설정 목표</div>
            <div className={classes.value_and_button}>
              <div>다이어트</div>
              <div style={{ marginLeft: "2vw" }}>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.chart}>
          <NutrientChart></NutrientChart>
          <div className={classes.itemList}>
            <div className={classes.item}>
              <div>칼로리</div>
              <div>1500kcal</div>
            </div>
            <div className={classes.item}>
              <div>탄수화물</div>
              <div>40g</div>
            </div>
            <div className={classes.item}>
              <div>단백질</div>
              <div>50g</div>
            </div>
            <div className={classes.item}>
              <div>지방</div>
              <div>30g</div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.addButtonContainer}>
        <NavLink to="/signup/weight" className={classes.addButton}>
          저장
        </NavLink>
      </div>
    </div>
  );
}

export default InfoModPage;
