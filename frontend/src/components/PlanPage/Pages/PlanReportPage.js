import TopHistoryNav from "../../TopNav/TopHistoryNav"
import classes from "./PlanReportPage.module.css"
import CountUp from "react-countup"
import RecommendListItem from "../../CalendarPage/RecommendListItem/RecommendListItem"
import ReactApexChart from "react-apexcharts"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { instance } from "../../../api/index"
import { registerTestItem, setDetailData } from "../../../store/planSlice"

function PlanReportPage() {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.userInfo)
  const [score, setScore] = useState(0)
  const [detailData, setDetailData] = useState(null)
  const planId = useSelector((state) => state.plan.planId)
  const testList = useSelector((state) => state.plan.testList)
  const dailyMealList = useSelector((state) => state.plan.dailyMealList)
  const [recommendList, setRecommendList] = useState({})

  console.log(testList)

  console.log(
    `userInfo: ${userInfo.dailyCalorie}/${userInfo.dailyCarb}/${userInfo.dailyProtein}/${userInfo.dailyFat}`
  )

  if (detailData) {
    console.log(
      `consume: ${detailData[0].total.calorie}/${detailData[0].total.carb}/${detailData[0].total.protein}/${detailData[0].total.fat}`
    )
  }

  useEffect(() => {
    if (planId !== -1 && dailyMealList.length !== 0) {
      setDetailData(
        dailyMealList.filter((item) => {
          return item.id === planId
        })
      )
    }
  }, [planId, dailyMealList])

  useEffect(() => {
    if (planId !== -1) {
      instance.get(`/recommend/${planId}`, {}).then((response) => {
        const obj = {}
        response.data.map((item, index) => {
          obj[index] = item
        })
        setRecommendList(obj)
      })
    }
  }, [planId])

  return (
    <div>
      <div id="top_nav_area">
        <TopHistoryNav />
      </div>
      <div className={classes.container}>
        <div className={classes.information}>
          <div className={classes.info_item}>
            <CountUp end={score} useEasing={true} />{" "}
            <span style={{ fontSize: "1.5rem", marginBottom: "1vh" }}>점</span>
          </div>
        </div>
        <div className={classes.ccontainer}>
          <div className={classes.graphcontainer}>
            <div className={classes.graph_title}>
              <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                목표 대비 섭취량
              </div>
            </div>

            <div>{/* 그래프 들어갈 자리 */}</div>
          </div>
          <div style={{ width: "90%", height: "36vh" }}>
            <div className={classes.recommend_title}>
              <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                부족한 영양소 보충을 위한 리스트입니다!
              </div>
            </div>
            <div className={classes.rcontainer}>
              {Object.keys(recommendList).length !== 0
                ? Object.keys(recommendList).map((item, index) => {
                    return (
                      <div
                        key={recommendList[item].food.id}
                        style={{
                          width: "100%",
                          height: "8vh",
                          marginBottom: "1vh",
                        }}
                      >
                        <RecommendListItem
                          index={index}
                          foodInfo={recommendList[item].food}
                          reason={recommendList[item].reason}
                        ></RecommendListItem>
                      </div>
                    )
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PlanReportPage
