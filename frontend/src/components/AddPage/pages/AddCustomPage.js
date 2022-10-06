import AddButtonList from "../AddButtonList/AddButtonList"
import classes from "./AddCustomPage.module.css"
import { useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import TopHistoryNav from "../../TopNav/TopHistoryNav"
import { instance } from "../../../api/index"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useHistory } from "react-router-dom"

function AddCustomPage() {
  const accessToken = useSelector((state) => state.user.accessToken)
  const history = useHistory()
  const MySwal = withReactContent(Swal)

  const [foodName, setFoodName] = useState("")
  const [foodAmount, setFoodAmount] = useState("")
  const [foodCalorie, setFoodCalorie] = useState("")
  const [foodCarb, setFoodCarb] = useState("")
  const [foodProtein, setFoodProtein] = useState("")
  const [foodFat, setFoodFat] = useState("")
  const [foodSugar, setFoodSugar] = useState("")
  const [foodCholesterol, setFoodCholesterol] = useState("")
  const [foodSaturatedFat, setFoodSaturatedFat] = useState("")
  const [foodTransFat, setFoodTransFat] = useState("")
  const [foodSalt, setFoodSalt] = useState("")

  const onClickHandler = () => {
    instance
      .post(
        "/food",
        {
          foodType: "string",
          name: foodName,
          totalAmount: Number(foodAmount),
          calorie: Number(foodCalorie),
          carb: Number(foodCarb),
          protein: Number(foodProtein),
          fat: Number(foodFat),
          sugar: Number(foodSugar),
          salt: Number(foodSalt),
          cholesterol: Number(foodCholesterol),
          saturatedFat: Number(foodSaturatedFat),
          transFat: Number(foodTransFat),
        },
        {}
      )
      .then((response) => {
        MySwal.fire({
          icon: "success",
          text: "저장 완료!",
          showConfirmButton: false,
          timer: 1500,
        })
        history.goBack()
      })
      .catch((error) => {
        console.log(error)
      })
    // axios({
    //   method: "post",
    //   url: "https://j7a704.p.ssafy.io/api/v1/food",
    //   data: {
    //     foodType: "string",
    //     name: foodName,
    //     totalAmount: Number(foodAmount),
    //     calorie: Number(foodCalorie),
    //     carb: Number(foodCarb),
    //     protein: Number(foodProtein),
    //     fat: Number(foodFat),
    //     sugar: Number(foodSugar),
    //     salt: Number(foodSalt),
    //     cholesterol: Number(foodCholesterol),
    //     saturatedFat: Number(foodSaturatedFat),
    //     transFat: Number(foodTransFat),
    //   },
    //   headers: { Authorization: `Bearer ${accessToken}` },
    // })
    //   .then((response) => {
    //     console.log(response)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  }

  return (
    <div style={{ marginTop: "2vh" }}>
      <div id="top_nav_area">
        <TopHistoryNav></TopHistoryNav>
      </div>

      <div className={classes.container}>
        <div className={classes.inputbox}>
          <input
            value={foodName}
            onChange={(e) => {
              setFoodName(e.target.value)
            }}
            className={`${classes.foodName} box_shadow`}
          ></input>
        </div>
        <div className={classes.detailcontainer}>
          <div className={classes.detailBig}>
            <div>기준 분량(g)</div>
            <input
              value={foodAmount}
              onChange={(e) => {
                setFoodAmount(e.target.value)
              }}
              placeholder="필수 입력"
              className={classes.input}
            ></input>
          </div>
          <div className={classes.detailBig}>
            <div>열량(kcal)</div>
            <input
              value={foodCalorie}
              onChange={(e) => {
                setFoodCalorie(e.target.value)
              }}
              className={classes.input}
              placeholder="필수 입력"
            ></input>
          </div>
          <div className={classes.detailBig}>
            <div>탄수화물(g)</div>
            <input
              value={foodCarb}
              onChange={(e) => {
                setFoodCarb(e.target.value)
              }}
              placeholder="필수 입력"
              className={classes.input}
            ></input>
          </div>
          <div className={classes.detailSmall}>
            <div className={classes.detailSmallSmall}>
              <div>당(g)</div>
              <input
                value={foodSugar}
                onChange={(e) => {
                  setFoodSugar(e.target.value)
                }}
                className={classes.input}
              ></input>
            </div>
          </div>
          <div className={classes.detailBig}>
            <div>단백질(g)</div>
            <input
              value={foodProtein}
              onChange={(e) => {
                setFoodProtein(e.target.value)
              }}
              className={classes.input}
              placeholder="필수 입력"
            ></input>
          </div>
          <div className={classes.detailBig}>
            <div>지방(g)</div>
            <input
              value={foodFat}
              onChange={(e) => {
                setFoodFat(e.target.value)
              }}
              className={classes.input}
            ></input>
          </div>
          <div className={classes.detailSmall}>
            <div className={classes.detailSmallSmall}>
              <div>포화지방(g)</div>
              <input
                value={foodSaturatedFat}
                onChange={(e) => setFoodSaturatedFat(e.target.value)}
                className={classes.input}
              ></input>
            </div>
          </div>
          <div className={classes.detailSmall}>
            <div className={classes.detailSmallSmall}>
              <div>트랜스지방(g)</div>
              <input
                value={foodTransFat}
                onChange={(e) => setFoodTransFat(e.target.value)}
                className={classes.input}
              ></input>
            </div>
          </div>
          <div className={classes.detailSmall}>
            <div className={classes.detailSmallSmall}>
              <div>콜레스트롤(mg)</div>
              <input
                value={foodCholesterol}
                onChange={(e) => {
                  setFoodCholesterol(e.target.value)
                }}
                className={classes.input}
              ></input>
            </div>
          </div>
          <div className={classes.detailSmall}>
            <div className={classes.detailSmallSmall}>
              <div>나트륨(mg)</div>
              <input
                value={foodSalt}
                onChange={(e) => {
                  setFoodSalt(e.target.value)
                }}
                className={classes.input}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div onClick={onClickHandler} className={classes.addButtonContainer}>
        <div className={classes.addButton}>저장하기</div>
      </div>
      <div className={classes.bcontainer}>
        <div className={classes.icon}>
          <i class="fa-solid fa-folder-plus fa-fw"></i>
        </div>
      </div>
    </div>
  )
}

export default AddCustomPage
