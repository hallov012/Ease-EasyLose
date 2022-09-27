import DragCounter from "../DragCounter/DragCounter";
import classes from "./AddAmountPage.module.css";
import TopNav from "../../TopNav/TopNav";
import { useState } from "react";
import AddButtonList from "../AddButtonList/AddButtonList";

function AddAmountPage() {
  const [amount, setAmount] = useState(1);
  return (
    <div>
      <div id="top_nav_area">
        <TopNav arrow={["/signup/gender", ""]}></TopNav>
        {/* 링크 작업 해야됨 */}
      </div>
      <div style={{ marginTop: "9vh" }} className={classes.container}>
        <div className={classes.info}>
          <div>1200 kcal</div>
        </div>
        <DragCounter
          height={"70%"}
          value={amount}
          unit={"인분"}
          setValue={(value) => {
            setAmount(value);
          }}
        ></DragCounter>
      </div>
      <div className={classes.addButtonContainer}>
        <div className={classes.addButton}>추가하기</div>
      </div>
      <AddButtonList></AddButtonList>
    </div>
  );
}

export default AddAmountPage;
