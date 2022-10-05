import { useEffect, useState } from "react";
import "./CalendarMainPage.css";
import classes from "./CalendarMainPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
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
} from "date-fns";
import { instance } from "../../api/index";
import ReactApexChart from "react-apexcharts";
import RecommendListItem from "./RecommendListItem/RecommendListItem";
import ReportChart from "./ReportChart/ReportChart";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeTestList,
  setDetailClicked,
  setDetailData,
} from "../../store/planSlice";
import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Confetti from "../SignUpPage/Confetti/Confetti";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { styled } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#a66cff",
    opacity: 0.8,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#a66cff",
    opacity: 0.8,
  },
}));

function CalendarMainPage() {
  const colorSet = {
    carbColor: "#afb4ff",
    proteinColor: "#7c83fd",
    fatColor: "#b1e1ff",
  };
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthData, setMonthData] = useState({});
  const [detailClicked, setDetailClicked] = useState(false);
  const detailData = useSelector((state) => state.plan.detailData);
  const testList = useSelector((state) => state.plan.testList);
  const dispatch = useDispatch();
  const [score, setScore] = useState(0);
  const [recommendList, setRecommendList] = useState({});
  const [foodNames, setFoodNames] = useState({});
  const [origin, setOrigin] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(initializeTestList());
  }, []);

  function previousToday(rsvDate) {
    let now = new Date();
    if (rsvDate) {
      now = format(now, "yyyy-MM-dd");

      if (rsvDate < now) {
        return true;
      }
    }
  }

  // if (detailData) {
  //   console.log(
  //     `userInfo: ${detailData.dailyCalorie}/${detailData.dailyCarb}/${detailData.dailyProtein}/${detailData.dailyFat}`
  //   )
  //   console.log(
  //     `consume: ${detailData.totalCalorie}/${detailData.totalCalorie}/${detailData.totalProtein}/${detailData.totalFat}`
  //   )
  // }

  useEffect(() => {
    if (detailData) {
      const obj = {};
      const obj2 = {};
      detailData.recommends.map((item, index) => {
        obj2[index] = item.name;
        obj[index] = item;
      });
      setRecommendList(obj);
      setFoodNames(obj2);
      setScore(Math.round(detailData.score * 100));
      setOrigin(Math.round(detailData.score * 100));
    }
  }, [detailData]);

  useEffect(() => {
    instance
      .get("/calendar/", {
        params: { year_month: format(currentMonth, "yyyy-MM") },
      })
      .then((response) => {
        setMonthData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentMonth]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

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
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="week day-labels">{days}</div>;
  };

  function showEmotion(score) {
    if (score > 80) {
      return <i className="fa-solid fa-face-laugh-squint"></i>;
    } else if (score > 60) {
      return <i className="fa-solid fa-face-smile"></i>;
    } else if (score > 40) {
      return <i className="fa-solid fa-face-meh"></i>;
    } else {
      return <i className="fa-solid fa-face-dizzy"></i>;
    }
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
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
                setDetailClicked(true);
                dispatch(
                  setDetailData(monthData[format(cloneDay, "yyyy-MM-dd")])
                );
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
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="week" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <>{rows}</>;
  };

  function mealScore(total, daily) {
    const corr = 0.1;

    const absRawScore = Math.abs(1 - total / daily);
    const absCorrScore = Math.max(0, absRawScore - corr) / (1 - corr);
    return 1 - absCorrScore;
  }

  useEffect(() => {
    if (detailData) {
      let _carb = detailData.totalCarb;
      let _protein = detailData.totalProtein;
      let _fat = detailData.totalFat;
      Object.keys(testList).map((item) => {
        _carb += testList[item].carb;
        _protein += testList[item].protein;
        _fat += testList[item].fat;
      });
      const _score = Math.round(
        ((mealScore(_carb, detailData.dailyCarb) +
          mealScore(_protein, detailData.dailyProtein) +
          mealScore(_fat, detailData.dailyFat)) /
          3) *
          100
      );
      setScore(_score);
    }
  }, [testList]);

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
                    dispatch(initializeTestList());
                    setDetailClicked(false);
                    dispatch(setDetailData(null));
                    setScore(0);
                  }}
                >
                  <FontAwesomeIcon icon={faAngleLeft} size="xl" />
                </div>
              </div>
            </div>
          </div>

          {detailData ? (
            <div className={classes.container}>
              {origin >= 90 ? <Confetti /> : null}
              {origin < 50 ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="error" color="info">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <strong>식사를 전부 입력하신게 맞나요?</strong>
                      <div>
                        아닐 경우 추천이 제대로 이루어지지 않을 수 있어요
                      </div>
                    </div>
                  </Alert>
                </Stack>
              ) : null}
              <div className={classes.information}>
                <div className={classes.info_item}>
                  <CountUp end={score} useEasing={true} />{" "}
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
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                      <div style={{ marginLeft: ".5rem" }}>
                        <HtmlTooltip
                          TransitionComponent={Zoom}
                          PopperProps={{
                            disablePortal: true,
                          }}
                          onClose={handleTooltipClose}
                          open={open}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          placement="right"
                          title={
                            <React.Fragment>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                }}
                              >
                                <div className={classes.tooltip}>
                                  <b>열량</b>
                                  <span>{detailData.dailyCalorie}g</span>
                                </div>
                                <div className={classes.tooltip}>
                                  <b>탄수화물</b>
                                  <span>{detailData.dailyCarb}g</span>
                                </div>
                                <div className={classes.tooltip}>
                                  <b>단백질</b>
                                  <span>{detailData.dailyProtein}g</span>
                                </div>
                                <div className={classes.tooltip}>
                                  <b>지방</b>
                                  <span>{detailData.dailyFat}g</span>
                                </div>
                              </div>
                            </React.Fragment>
                          }
                          color="primary"
                          arrow
                        >
                          <i
                            onClick={handleTooltipOpen}
                            className="fa-regular fa-circle-question"
                            style={{ position: "relative" }}
                          ></i>
                        </HtmlTooltip>
                      </div>
                    </ClickAwayListener>
                  </div>

                  <ReportChart
                    name={foodNames}
                    detailData={detailData}
                    testList={testList}
                  />
                </div>
                <div style={{ width: "90%", height: "36vh" }}>
                  <div className={classes.recommend_title}>
                    <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                      부족한 영양소 보충을 위한 리스트입니다!
                    </div>
                    <div
                      style={{
                        fontSize: ".9rem",
                        marginTop: ".2rem",
                        color: `${colorSet.proteinColor}`,
                      }}
                    >
                      음식을 추가해 부족한 영양소를 채워보세요!
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
                                height: "9vh",
                                marginBottom: "1vh",
                              }}
                            >
                              <RecommendListItem
                                index={index}
                                foodInfo={recommendList[item].food}
                                reason={recommendList[item].reason}
                                colorSet={colorSet}
                              ></RecommendListItem>
                            </div>
                          );
                        })
                      : null}
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
  );
}

export default CalendarMainPage;
