import { useHistory, useLocation } from "react-router-dom";
import classes from "./AddSearchPage.module.css";
import ListItemCheckBox from "../ListItemCheckBox/ListItemCheckBox";
import AddButtonList from "../AddButtonList/AddButtonList";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TopHistoryNav from "../../TopNav/TopHistoryNav";
import SelectBtn from "../../ChartPage/SelectBtn/SelectBtn";
import {
  registerSearchList,
  registerRecentList,
  initializeBasket,
  initializeItem,
} from "../../../store/basketSlice";
import { removeItem } from "../../../store/basketSlice";

import { instance } from "../../../api/index";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AddSearchPage() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const [searchTerm, setSearchTerm] = useState("");
  const pickedList = useSelector((state) => state.basket.pickedList);
  const searchList = useSelector((state) => state.basket.searchList);
  const recentList = useSelector((state) => state.basket.recentList);

  const mealtime = useSelector((state) => state.status.lastEntered);
  const targetDate = useSelector((state) => state.daily.targetDate);

  const MySwal = withReactContent(Swal);

  const [term, setTerm] = useState(0);

  useEffect(() => {
    instance
      .get("/food/recent", {})
      .then((response) => {
        dispatch(registerRecentList(response.data));
      })
      .catch((error) => console.log(error));
  }, []);

  const onClickHandler = () => {
    if (searchTerm) {
      instance
        .get("/food", {
          params: {
            name: searchTerm,
          },
        })
        .then((response) => dispatch(registerSearchList(response.data)))
        .catch((error) => {
          console.log(error);
        });
    }
  };

  async function registerPickedList() {
    await pickedList.map((item) => {
      instance
        .post(
          "/dailymeal",
          {
            date: targetDate,
            mealType: mealtime,
            count: item.count,
            foodId: item.id,
          },
          {}
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    });
    dispatch(initializeItem());
  }

  return (
    <div style={{ marginTop: "9vh" }}>
      <div id="top_nav_area">
        <TopHistoryNav
          bonus={() => {
            dispatch(initializeBasket());
          }}
        ></TopHistoryNav>
      </div>
      <div className={classes.container}>
        <div
          style={{
            width: "90vw",
            height: "5vh",
            marginTop: "2vh",
            marginBottom: "2vh",
          }}
        >
          <SelectBtn
            data={["음식 검색", "자주 먹은 음식"]}
            setValue={(value) => {
              setTerm(value);
            }}
          ></SelectBtn>
        </div>
        <div
          style={{ display: term == 0 ? "flex" : "none" }}
          className={classes.scontainer}
        >
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            style={{
              width: "75vw",
              height: "5vh",
              border: "2px solid #00033F",
              borderRadius: 5,
              background: "#FDFCFC",
            }}
          ></input>
          <div
            style={{
              fontSize: 30,
              marginRight: 10,
            }}
            onClick={onClickHandler}
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div style={{ overflow: "scroll", height: "60vh" }}>
          {term == 0
            ? searchList.map((item) => {
                return (
                  <div key={item.id} style={{ width: "90vw", height: "10vh" }}>
                    <ListItemCheckBox
                      selected={false}
                      foodInfo={item}
                      type={term}
                    ></ListItemCheckBox>
                  </div>
                );
              })
            : recentList.map((item) => {
                return (
                  <div key={item.id} style={{ width: "90vw", height: "10vh" }}>
                    <ListItemCheckBox
                      selected={false}
                      foodInfo={item}
                      type={term}
                    ></ListItemCheckBox>
                  </div>
                );
              })}
        </div>
      </div>
      <div className={classes.pickedList}>
        {pickedList.map((item) => {
          return (
            <div key={item.id} className={classes.pickedItem}>
              <div className={classes.pickedItem_title}>{item.name}</div>
              <div
                onClick={() => {
                  dispatch(removeItem(item));
                }}
              >
                <i className="fa-solid fa-x"></i>
              </div>
            </div>
          );
        })}
      </div>
      <div
        onClick={() => {
          if (pickedList.length === 0) {
            MySwal.fire({
              icon: "warning",
              title: "선택한 음식이 없어요!",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            registerPickedList();
            MySwal.fire({
              icon: "success",
              title: "성공적으로 등록했습니다!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }}
        className={classes.addButtonContainer}
      >
        <div className={classes.addButton}>추가하기</div>
      </div>
      <AddButtonList></AddButtonList>
    </div>
  );
}

export default AddSearchPage;
