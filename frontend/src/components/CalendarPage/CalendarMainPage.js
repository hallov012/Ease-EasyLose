import { useEffect, useState } from "react"
import "./CalendarMainPage.css"
import classes from "./CalendarMainPage.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import {
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  format,
  subMonths,
} from "date-fns"
import { instance } from "../../api/index"
import ReactApexChart from "react-apexcharts"
import RecommendListItem from "./RecommendListItem/RecommendListItem"
import CountUp from "react-countup"
import { useDispatch, useSelector } from "react-redux"
import { initializeTestList } from "../../store/planSlice"

const style = {
  maxWidth: "350px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  border: "none",
  outline: "none",
}

function CalendarMainPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [monthData, setMonthData] = useState({})
  const [detailClicked, setDetailClicked] = useState(false)
  const [detailData, setDetailData] = useState(undefined)
  const testList = useSelector((state) => state.plan.testList)
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const dispatch = useDispatch()
  const [limit, setLimit] = useState(0)
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["칼로리", "탄수화물", "단백질", "지방"],
      },
    },
    series: [
      {
        name: "series-1",
        data: [0, 0, 0, 0],
      },
    ],
  })
  const [recommendList, setRecommendList] = useState([])

  function previousToday(rsvDate) {
    let now = new Date()
    if (rsvDate) {
      now = format(now, "yyyy-MM-dd")

      if (rsvDate < now) {
        return true
      }
    }
  }

  console.log(detailData)

  function onClickTestHandler() {
    setOpen(true)
    let tempCalorie = detailData.totalCalorie
    let tempCarb = detailData.totalCarb
    let tempProtein = detailData.totalProtein
    let tempFat = detailData.totalFat
    testList.map((item) => {
      tempCalorie += item.calorie
      tempCarb += item.carb
      tempProtein += item.protein
      tempFat += item.fat
    })
    console.log(`${tempCalorie}/${tempCarb}/${tempProtein}/${tempFat}`)
  }

  useEffect(() => {
    if (detailData) {
      setRecommendList(detailData.recommends)
      setLimit(Math.round(detailData.score * 100))
      setState({
        options: {
          colors: [
            Math.round(
              ((detailData.totalCalorie - detailData.dailyCalorie) /
                detailData.dailyCalorie) *
                100 +
                100
            ) > 100
              ? "#2c00e9"
              : "#f90000",
            Math.round(
              ((detailData.totalCarb - detailData.dailyCarb) /
                detailData.dailyCarb) *
                100 +
                100
            ) > 100
              ? "#2c00e9"
              : "#f90000",
            Math.round(
              ((detailData.totalProtein - detailData.dailyProtein) /
                detailData.dailyProtein) *
                100 +
                100
            ) > 100
              ? "#2c00e9"
              : "#f90000",
            Math.round(
              ((detailData.totalFat - detailData.dailyFat) /
                detailData.dailyFat) *
                100 +
                100
            ) > 100
              ? "#2c00e9"
              : "#f90000",
          ],
          chart: {
            id: "basic-bar",
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 5,
              columnWidth: "50%",
              distributed: true,
            },
          },
          legend: {
            show: false,
          },
          yaxis: {
            labels: {
              formatter: function (y) {
                return y.toFixed(0) + "%"
              },
            },
          },
          xaxis: {
            categories: ["칼로리", "탄수화물", "단백질", "지방"],
          },
          dataLabels: {
            enabled: false,
          },
        },
        series: [
          {
            name: "diff",
            data: [
              Math.round(
                ((detailData.totalCalorie - detailData.dailyCalorie) /
                  detailData.dailyCalorie) *
                  100 +
                  100
              ),
              Math.round(
                ((detailData.totalCarb - detailData.dailyCarb) /
                  detailData.dailyCarb) *
                  100 +
                  100
              ),
              Math.round(
                ((detailData.totalProtein - detailData.dailyProtein) /
                  detailData.dailyProtein) *
                  100 +
                  100
              ),
              Math.round(
                ((detailData.totalFat - detailData.dailyFat) /
                  detailData.dailyFat) *
                  100 +
                  100
              ),
            ],
          },
        ],
      })
    }
  }, [detailData])

  console.log(monthData)

  useEffect(() => {
    instance
      .get("/calendar/", {
        params: { year_month: format(currentMonth, "yyyy-MM") },
      })
      .then((response) => {
        setMonthData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [currentMonth])

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }
  const onDateClick = (day) => {
    setSelectedDate(day)
  }
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy"

    return (
      <div className={classes.top_nav_item_list}>
        <div className={classes.top_nav_item}>
          <div
            className={`${classes.top_nav_item__box} ${classes.top_nav_item__arrow}`}
            style={{ display: "flex" }}
            onClick={(e) => prevMonth(e)}
          >
            <FontAwesomeIcon icon={faAngleLeft} size="xl" />
          </div>
        </div>
        <div
          className={`${classes.top_nav_item} ${classes.top_nav_item__text}`}
        >
          <div className={classes.top_nav_item__box}>
            <div>{format(currentMonth, dateFormat)}</div>
          </div>
        </div>
        <div className={classes.top_nav_item}>
          <div
            className={`${classes.top_nav_item__box} ${classes.top_nav_item__arrow}`}
            style={{ display: "flex" }}
            onClick={(e) => nextMonth(e)}
          >
            <FontAwesomeIcon icon={faAngleRight} size="xl" />
          </div>
        </div>
      </div>
    )
  }

  const renderDays = () => {
    const dateFormat = "EEE"
    const days = []

    let startDate = startOfWeek(currentMonth)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      )
    }

    return <div className="week day-labels">{days}</div>
  }

  function showEmotion(score) {
    if (score > 80) {
      return <i className="fa-solid fa-face-laugh-squint"></i>
    } else if (score > 60) {
      return <i className="fa-solid fa-face-smile"></i>
    } else if (score > 40) {
      return <i className="fa-solid fa-face-meh"></i>
    } else {
      return <i className="fa-solid fa-face-dizzy"></i>
    }
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    const dateFormat = "d"
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ""
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat)
        const cloneDay = day
        days.push(
          <div
            className={`day ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "is-selected"
                : isSameDay(day, new Date())
                ? "is-today"
                : ""
            } `}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            key={day}
            onClick={(e) => {
              if (
                monthData[format(cloneDay, "yyyy-MM-dd")] &&
                previousToday(format(cloneDay, "yyyy-MM-dd"))
              ) {
                setDetailClicked(true)
                setDetailData(monthData[format(cloneDay, "yyyy-MM-dd")])
              }
            }}
          >
            <span className="number">{formattedDate}</span>
            <div style={{ fontSize: 30 }}>
              {monthData
                ? monthData[format(cloneDay, "yyyy-MM-dd")] &&
                  previousToday(format(cloneDay, "yyyy-MM-dd"))
                  ? showEmotion(
                      monthData[format(cloneDay, "yyyy-MM-dd")].score * 100
                    )
                  : null
                : null}
            </div>
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className="week" key={day}>
          {days}
        </div>
      )
      days = []
    }

    return <>{rows}</>
  }

  return (
    <div style={{ width: "100%" }}>
      {detailClicked ? (
        <div>
          <div id="top_nav_area">
            <div className={classes.top_nav_item_list}>
              <div className={classes.top_nav_item}>
                <div
                  className={`${classes.top_nav_item__box} ${classes.top_nav_item__arrow}`}
                  style={{ display: "flex" }}
                  onClick={() => {
                    dispatch(initializeTestList())
                    setDetailClicked(false)
                    setDetailData(null)
                    setLimit(0)
                    setState({
                      options: {
                        chart: {
                          id: "basic-bar",
                        },
                        xaxis: {
                          categories: ["칼로리", "탄수화물", "단백질", "지방"],
                        },
                      },
                      series: [
                        {
                          name: "series-1",
                          data: [0, 0, 0, 0],
                        },
                      ],
                    })
                  }}
                >
                  <FontAwesomeIcon icon={faAngleLeft} size="xl" />
                </div>
              </div>
            </div>
          </div>

          {detailData ? (
            <div className={classes.container}>
              <div className={classes.information}>
                <div className={classes.info_item}>
                  <CountUp end={limit} useEasing={true} />{" "}
                  <span style={{ fontSize: "1.5rem", marginBottom: "1vh" }}>
                    점
                  </span>
                </div>
              </div>
              <div className={classes.ccontainer}>
                <div className={classes.graphcontainer}>
                  <div className={classes.graph_title}>
                    <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                      목표 대비 섭취량
                    </div>
                  </div>

                  <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="bar"
                    height={"90%"}
                  ></ReactApexChart>
                </div>
                <div style={{ width: "90%", height: "36vh" }}>
                  <div className={classes.recommend_title}>
                    <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                      부족한 영양소 보충을 위한 리스트입니다!
                    </div>
                  </div>
                  <div className={classes.rcontainer}>
                    {recommendList.length !== 0
                      ? recommendList.map((item) => {
                          return (
                            <div
                              key={item.food.id}
                              style={{ width: "100%", height: "10vh" }}
                            >
                              <RecommendListItem
                                foodInfo={item.food}
                                reason={item.reason}
                              ></RecommendListItem>
                            </div>
                          )
                        })
                      : null}
                  </div>
                </div>
                <div style={{ height: "4vh", width: "90%" }}>
                  <div
                    onClick={onClickTestHandler}
                    className={classes.testbutton}
                  >
                    추가해보기
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="my-calendar-container">
          <div className="my-calendar">
            <div id="top_nav_area">{renderHeader()}</div>
            <div style={{ marginTop: "9vh" }}>
              <div className="my-calendar-body">
                {renderDays()}
                {monthData ? renderCells() : null}
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              fontFamily: "Arita-dotum-Medium",
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            예상 결과입니다!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className={classes.information}>
                <div className={classes.info_item}>
                  <CountUp end={limit} useEasing={true} />{" "}
                  <span style={{ fontSize: "1.3rem", marginBottom: "2vh" }}>
                    점
                  </span>
                </div>
              </div>
              <div className={classes.graphcontainer}>
                <div className={classes.graph_title}>
                  <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                    목표 대비 섭취량
                  </div>
                </div>

                <ReactApexChart
                  options={state.options}
                  series={state.series}
                  type="bar"
                  height={"90%"}
                ></ReactApexChart>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  width: "100%",
                  height: "5vh",
                  color: "black",
                  backgroundColor: "var(--gray-color)",
                  fontSize: "1.1rem",
                  fontFamily: "Arita-dotum-Medium",
                }}
                onClick={handleClose}
              >
                확인
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default CalendarMainPage
