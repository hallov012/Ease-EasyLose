import { useEffect, useState } from "react"
import "./CalendarMainPage.css"
import classes from "./CalendarMainPage.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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

function CalendarMainPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [monthData, setMonthData] = useState({})
  const [detailClicked, setDetailClicked] = useState(false)
  const [detailData, setDetailData] = useState(undefined)
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
  const [recommendList, setRecommendList] = useState([1, 2, 3, 4, 5])

  useEffect(() => {
    if (detailData) {
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
              justifyContent: "space-around",
            }}
            key={day}
            onClick={(e) => {
              if (monthData[format(cloneDay, "yyyy-MM-dd")]) {
                setDetailClicked(true)
                setDetailData(monthData[format(cloneDay, "yyyy-MM-dd")])
              }
            }}
          >
            <span className="number">{formattedDate}</span>
            <div style={{ fontSize: 30 }}>
              {monthData
                ? monthData[format(cloneDay, "yyyy-MM-dd")]
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
    <div>
      {detailClicked ? (
        <div>
          <div id="top_nav_area">
            <div className={classes.top_nav_item_list}>
              <div className={classes.top_nav_item}>
                <div
                  className={`${classes.top_nav_item__box} ${classes.top_nav_item__arrow}`}
                  style={{ display: "flex" }}
                  onClick={() => {
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
                <div>멘트멘트멘트멘트멘트멘트</div>
              </div>
              <div>
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
                <div style={{ width: "90vw", height: "35vh" }}>
                  <div className={classes.recommend_title}>
                    <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                      부족한 영양소 보충을 위한 리스트입니다!
                    </div>
                  </div>
                  <div style={{ overflow: "scroll", height: "32vh" }}>
                    {recommendList.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{ width: "90vw", height: "10vh" }}
                        >
                          <RecommendListItem></RecommendListItem>
                        </div>
                      )
                    })}
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
    </div>
  )
}

export default CalendarMainPage
