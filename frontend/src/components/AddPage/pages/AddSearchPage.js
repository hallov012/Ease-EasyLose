import { useHistory, useLocation } from "react-router-dom"
import classes from "./AddSearchPage.module.css"
import ListItemCheckBox from "../ListItemCheckBox/ListItemCheckBox"
import AddButtonList from "../AddButtonList/AddButtonList"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import TopHistoryNav from "../../TopNav/TopHistoryNav"
import SelectBtn from "../../ChartPage/SelectBtn/SelectBtn"
import {
  registerSearchList,
  registerRecentList,
} from "../../../store/basketSlice"

function AddSearchPage() {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.user.accessToken)
  const [searchTerm, setSearchTerm] = useState("")
  const pickedList = useSelector((state) => state.basket.pickedList)
  const selectedList = useSelector((state) => state.basket.selectedList)
  const recentList = useSelector((state) => state.basket.recentList)

  const [term, setTerm] = useState(0)

  useEffect(() => {
    axios({
      method: "get",
      url: "https://j7a704.p.ssafy.io/api/v1/food/recent",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        dispatch(registerRecentList(response.data))
      })
      .catch((error) => console.log(error))
  }, [])

  const onClickHandler = () => {
    if (searchTerm) {
      axios({
        method: "get",
        url: "https://j7a704.p.ssafy.io/api/v1/food",
        params: {
          name: searchTerm,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => dispatch(registerSearchList(response.data)))
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div style={{ marginTop: "9vh" }}>
      <div id="top_nav_area">
        <TopHistoryNav></TopHistoryNav>
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
              setTerm(value)
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
              setSearchTerm(e.target.value)
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
          {pickedList.map((item) => {
            return (
              <ListItemCheckBox
                key={item.id}
                foodInfo={item}
                selected={true}
              ></ListItemCheckBox>
            )
          })}
          {term == 0
            ? selectedList.map((item) => {
                return (
                  <ListItemCheckBox
                    selected={false}
                    key={item.id}
                    foodInfo={item}
                  ></ListItemCheckBox>
                )
              })
            : recentList.map((item) => {
                return (
                  <ListItemCheckBox
                    selected={false}
                    key={item.id}
                    foodInfo={item}
                  ></ListItemCheckBox>
                )
              })}
        </div>
      </div>
      <div
        onClick={() => {
          history.push("/add/basket", { from: location })
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
