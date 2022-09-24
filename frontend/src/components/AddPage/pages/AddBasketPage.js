import classes from "./AddBasketPage.module.css";
import AddButtonList from "../AddButtonList/AddButtonList";
import TopNav from "../../TopNav/TopNav";

function AddBasketPage() {
  return (
    <div>
      <div id="top_nav_area">
        <TopNav arrow={["/signup/gender", ""]}></TopNav>
        {/* 링크 작업 해야됨 */}
      </div>
      <div className={classes.container}>
        <div>
          <div className={classes.title}>추가될 음식</div>
          <div className={classes.item}>
            <div className={classes.itemInfo}>
              <div className={classes.name}>삶은 계란</div>
              <div className={classes.amount}>1인분</div>
            </div>
            <div className={classes.calorie}>63kcal</div>
          </div>
        </div>
        <div className={classes.sum}>
          <div>합계</div>
          <div>360kcal</div>
        </div>
      </div>

      <AddButtonList></AddButtonList>
    </div>
  );
}

export default AddBasketPage;
