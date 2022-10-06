import classes from "./AddAmountPage.module.css";
import { useState } from "react";
import AddButtonList from "../AddButtonList/AddButtonList";

import { useHistory } from "react-router-dom";
import { registerItem } from "../../../store/basketSlice";
import { useDispatch, useSelector } from "react-redux";

import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import TopHistoryNav from "../../TopNav/TopHistoryNav";

const PrettoSlider = styled(Slider)({
  color: "#7c83fd",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 15,
    background: "unset",
    padding: 0,
    width: 40,
    height: 40,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#7c83fd",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

function AddAmountPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);
  const foodInfo = history.location.state.foodInfo;
  const listType = history.location.state.type;
  const pickedList = useSelector((state) => state.basket.pickedList);

  const current_total_calorie = () => {
    let sum = 0;
    pickedList.map((item) => {
      sum += item.calorie;
    });
    return sum;
  };

  const onClickHandler = () => {
    const temp = { ...foodInfo, count: amount, listType: listType };
    dispatch(registerItem(temp));
    history.goBack();
  };

  return (
    <div>
      <div id="top_nav_area">
        <TopHistoryNav></TopHistoryNav>
      </div>
      <div style={{ marginTop: "3vh" }} className={classes.container}>
        <div className={classes.food_info_box}>
          <div className={classes.food_info__top}>
            <span>{foodInfo.name}</span>
          </div>
          <div className={classes.food_info__body}>
            <div>{foodInfo.calorie}</div>
            <i class="fa-solid fa-xmark"></i>
            <div className={classes.amount_text}>
              <span>{amount}</span> (개)
            </div>
            <i class="fa-solid fa-right-long"></i>
            <div className={classes.total_text}>
              {Math.round(foodInfo.calorie) * amount}kcal
            </div>
          </div>
        </div>
        <div style={{ width: "80%", marginTop: "10vh" }}>
          <PrettoSlider
            valueLabelDisplay="on"
            aria-label="pretto slider"
            value={amount}
            step={0.5}
            min={0.5}
            max={5}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <div
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          ※ 1회 제공량 기준입니다
        </div>
      </div>
      <div onClick={onClickHandler} className={classes.addButtonContainer}>
        <div
          className={classes.addButton}
          style={{ color: "var(--inner-text-color)" }}
        >
          추가하기
        </div>
      </div>
      <AddButtonList></AddButtonList>
    </div>
  );
}

export default AddAmountPage;
