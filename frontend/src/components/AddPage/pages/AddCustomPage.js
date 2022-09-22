import AddButtonList from "../AddButtonList/AddButtonList";
import TopNav from "../../TopNav/TopNav";
import classes from "./AddCustomPage.module.css";

function AddCustomPage() {
  return (
    <div>
      <div id="top_nav_area">
        <TopNav arrow={["", "/signup/gender"]}></TopNav>
        {/* 링크 작업 해야됨 */}
      </div>
      <div className={classes.container}>
        <div className={classes.inputbox}>
          <input className={classes.foodName}></input>
        </div>
        <div className={classes.detailcontainer}>
          <div className={classes.detailBig}>
            <div>기준 분량(g)</div>
            <input className={classes.input}></input>
          </div>
          <div className={classes.detailBig}>
            <div>열량(kcal)</div>
            <input className={classes.input}></input>
          </div>
          <div className={classes.detailBig}>
            <div>탄수화물(g)</div>
            <input className={classes.input}></input>
          </div>
          <div className={classes.detailSmall}>
            <div className={classes.detailSmallSmall}>
              <div>당(g)</div>
              <input className={classes.input}></input>
            </div>
          </div>
          <div className={classes.detailBig}>
            <div>단백질(g)</div>
            <input className={classes.input}></input>
          </div>
          <div className={classes.detailBig}>
            <div>지방(g)</div>
            <input className={classes.input}></input>
          </div>
          <div className={classes.detailSmall}>
            <div className={classes.detailSmallSmall}>
              <div>포화지방(g)</div>
              <input className={classes.input}></input>
            </div>
          </div>
          <div className={classes.detailSmall}>
            <div className={classes.detailSmallSmall}>
              <div>트랜스지방(g)</div>
              <input className={classes.input}></input>
            </div>
          </div>
          <div className={classes.detailSmall}>
            <div className={classes.detailSmallSmall}>
              <div>콜레스트롤(g)</div>
              <input className={classes.input}></input>
            </div>
          </div>
          <div className={classes.detailSmall}>
            <div className={classes.detailSmallSmall}>
              <div>나트륨(g)</div>
              <input className={classes.input}></input>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.addButtonContainer}>
        <div className={classes.addButton}>저장하기</div>
      </div>
      <AddButtonList></AddButtonList>
    </div>
  );
}

export default AddCustomPage;
