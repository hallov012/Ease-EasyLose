import { useHistory, useLocation } from "react-router-dom"
import classes from "./AddSearchPage.module.css"
import ListItemCheckBox from "../ListItemCheckBox/ListItemCheckBox"
import AddButtonList from "../AddButtonList/AddButtonList"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import TopHistoryNav from "../../TopNav/TopHistoryNav"
import SelectBtn from "../../ChartPage/SelectBtn/SelectBtn"
import NonList from "../NonList/NonList"
import {
  registerSearchList,
  registerRecentList,
  initializeBasket,
  initializeItem,
} from "../../../store/basketSlice"
import { removeItem } from "../../../store/basketSlice"

import { instance } from "../../../api/index"

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { registerSearchOrRecent } from "../../../store/statusSlice"

import dateFormat, { masks } from "dateformat"

function AddSearchPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const pickedList = useSelector((state) => state.basket.pickedList)
  const searchList = useSelector((state) => state.basket.searchList)
  const recentList = useSelector((state) => state.basket.recentList)
  const searchOrRecent = useSelector((state) => state.status.searchOrRecent)

  const mealtime = useSelector((state) => state.status.lastEntered)
  const target_date = JSON.parse(
    useSelector((state) => state.status.targetDate)
  )

  const MySwal = withReactContent(Swal)

  useEffect(() => {
    instance
      .get("/food/recent", {})
      .then((response) => {
        dispatch(registerRecentList(response.data))
      })
      .catch((error) => console.log(error))
  }, [])

  function onEnterHandler(event) {
    if (event.keyCode == 13) {
      if (searchTerm) {
        instance
          .get("/food", {
            params: {
              name: searchTerm,
            },
          })
          .then((response) => {
            if (response.data.length !== 0)
              dispatch(registerSearchList(response.data))
            else {
              MySwal.fire({
                icon: "error",
                title: "검색 결과 없음!",
                showConfirmButton: false,
                timer: 1500,
              })
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }

  const onClickHandler = () => {
    if (searchTerm) {
      instance
        .get("/food", {
          params: {
            name: searchTerm,
          },
        })
        .then((response) => {
          if (response.data.length !== 0)
            dispatch(registerSearchList(response.data))
          else {
            MySwal.fire({
              icon: "error",
              text: "검색 결과 없음!",
              showConfirmButton: false,
              timer: 1500,
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  function registerPickedList() {
    if (typeof target_date !== "number") {
      const obj = {
        date: dateFormat(target_date, "yyyy-mm-dd"),
        mealType: mealtime,
        foods: [],
      }
      pickedList.map((item) => {
        obj.foods = [...obj.foods, { count: item.count, foodId: item.id }]
      })
      instance
        .post("/dailymeal", obj, {})
        .then((response) => console.log())
        .catch((error) => console.log(error))
      dispatch(initializeItem())
    } else {
      const obj = {
        mealType: mealtime,
        foods: [],
      }
      pickedList.map((item) => {
        obj.foods = [...obj.foods, { count: item.count, foodId: item.id }]
      })
      instance
        .post(`/foodset/${target_date}`, obj, {})
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => console.log(error))
      dispatch(initializeItem())
    }
  }

  return (
    <div style={{ marginTop: "9vh", width: "100%" }}>
      <div id="top_nav_area">
        <TopHistoryNav
          bonus={() => {
            dispatch(initializeBasket())
            dispatch(registerSearchOrRecent(0))
          }}
        ></TopHistoryNav>
      </div>
      <div className={classes.container}>
        <div
          style={{
            width: "90%",
            height: "5vh",
            marginTop: "2vh",
            marginBottom: "2vh",
          }}
        >
          <SelectBtn
            data={["최근 추가 음식", "음식 검색"]}
            setValue={(value) => {
              dispatch(registerSearchOrRecent(value))
            }}
            def={searchOrRecent}
          ></SelectBtn>
        </div>
        <div
          style={{ display: searchOrRecent === 1 ? "flex" : "none" }}
          className={classes.scontainer}
        >
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
            className={`${classes.input} box_shadow`}
            onKeyUp={onEnterHandler}
          ></input>
          <div
            style={{
              fontSize: 30,
              marginRight: 10,
            }}
            onClick={onClickHandler}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className={classes.scroll}>
          {searchOrRecent === 1 ? (
            searchList.length === 0 ? (
              <NonList />
            ) : (
              searchList.map((item) => {
                return (
                  <div key={item.id} style={{ width: "100%", height: "10vh" }}>
                    <ListItemCheckBox
                      selected={false}
                      foodInfo={item}
                      type={searchOrRecent}
                    ></ListItemCheckBox>
                  </div>
                )
              })
            )
          ) : recentList.length === 0 ? (
            <NonList />
          ) : (
            recentList.map((item) => {
              return (
                <div key={item.id} style={{ width: "100%", height: "10vh" }}>
                  <ListItemCheckBox
                    selected={false}
                    foodInfo={item}
                    type={searchOrRecent}
                  ></ListItemCheckBox>
                </div>
              )
            })
          )}
        </div>
      </div>
      <div className={classes.pickedList}>
        {pickedList.map((item) => {
          return (
            <div key={item.id} className={classes.pickedItem}>
              <div style={{ width: "85%" }}>
                <div className={classes.pickedItem_title}>{item.name}</div>
                <div className={classes.pickedItem_sub}>{`${Math.round(
                  item.calorie
                )} kcal X ${item.count} 개 = ${
                  Math.round(item.calorie) * item.count
                } kcal`}</div>
              </div>
              <div
                style={{ fontSize: "1.5rem" }}
                onClick={() => {
                  dispatch(removeItem(item))
                }}
              >
                <i className="fa-solid fa-x"></i>
              </div>
            </div>
          )
        })}
      </div>
      <div
        onClick={() => {
          if (pickedList.length === 0) {
            MySwal.fire({
              icon: "warning",
              text: "선택한 음식이 없어요!",
              showConfirmButton: false,
              timer: 1500,
            })
          } else {
            registerPickedList()
            MySwal.fire({
              icon: "success",
              text: "성공적으로 등록했습니다!",
              showConfirmButton: false,
              timer: 1500,
            })
            dispatch(initializeBasket())
            dispatch(registerSearchOrRecent(0))
            history.goBack()
          }
        }}
        className={classes.addButtonContainer}
      >
        <div className={classes.addButton}>추가하기</div>
      </div>
      <AddButtonList></AddButtonList>
    </div>
  )
}

export default AddSearchPage
