import classes from "./AddBasketPage.module.css";
import AddButtonList from "../AddButtonList/AddButtonList";
import TopNav from "../../TopNav/TopNav";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function AddBasketPage() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const history = useHistory();
  const basketList = useSelector((state) => state.basket.basket);
  const previousPage = history.location.state.from.pathname;

  const mealtime = useSelector((state) => state.status.lastEntered);
  const targetDate = useSelector((state) => state.daily.targetDate);

  const onClickHandler = () => {
    basketList.map((item) => {
      axios({
        method: "post",
        url: "https://j7a704.p.ssafy.io/api/v1/dailymeal",
        data: {
          date: targetDate,
          mealType: mealtime,
          count: 1,
          userId: 1,
          foodId: item.id,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    });
  };

  const sumCalorie = () => {
    let sum = 0;
    basketList.map((item) => {
      sum += item.calorie;
    });
    return sum;
  };
  return (
    <div>
      <div id="top_nav_area">
        <TopNav arrow={[previousPage, ""]}></TopNav>
        {/* 링크 작업 해야됨 */}
      </div>
      <div className={classes.container}>
        <div>
          <div className={classes.title}>추가될 음식</div>
          {basketList.map((item, index) => {
            return (
              <div className={classes.item} key={index}>
                <div className={classes.itemInfo}>
                  <div className={classes.name}>{item.name}</div>
                  <div className={classes.amount}>{item.total_amount}</div>
                </div>
                <div className={classes.calorie}>{item.calorie}kcal</div>
              </div>
            );
          })}
        </div>
        <div className={classes.sum}>
          <div>합계</div>
          <div>
            {sumCalorie()}
            kcal
          </div>
        </div>
      </div>
      <div onClick={onClickHandler} className={classes.addButtonContainer}>
        <div className={classes.addButton}>추가하기</div>
      </div>
      <AddButtonList></AddButtonList>
    </div>
  );
}

export default AddBasketPage;
