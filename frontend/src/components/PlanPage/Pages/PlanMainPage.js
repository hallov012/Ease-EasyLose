import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import SelectBtn from "../../ChartPage/SelectBtn/SelectBtn"
import ListItem from "../ListItem/ListItem"
import ListItemDelete from "../ListItemDelete/ListItemDelete"
import classes from "./PlanMainPage.module.css"

function PlanMainPage() {
  const [term, setTerm] = useState(0)
  const dispatch = useDispatch()
  const oneMealList = useSelector((state) => state.plan.oneMealList)
  const dailyMealList = useSelector((state) => state.plan.dailyMealList)

  // const oneMealList = [1, 2]
  // const dailyMealList = [1, 2]

  useEffect(() => {}, [])

  return (
    <div className={classes.container}>
      <div style={{ width: "90vw" }}>
        <SelectBtn
          data={["하루 식단 모음", "한끼 모음"]}
          setValue={(value) => {
            setTerm(value)
          }}
        ></SelectBtn>
      </div>
      <div className={classes.itemContainer}>
        {term === 1
          ? oneMealList.map((item) => {
              return (
                <div style={{ width: "90vw", height: "10vh" }}>
                  <ListItem></ListItem>
                </div>
              )
            })
          : dailyMealList.map((item) => {
              return (
                <div style={{ width: "90vw", height: "10vh" }}>
                  <ListItemDelete></ListItemDelete>
                </div>
              )
            })}
      </div>
      <div className={`${classes.add_btn} gradient_color__horizon box_shadow`}>
        추가하기</div>
    </div>
  )
}

export default PlanMainPage
