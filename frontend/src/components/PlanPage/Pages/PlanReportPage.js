import TopHistoryNav from "../../TopNav/TopHistoryNav";
import classes from "./PlanReportPage.module.css";
import CountUp from "react-countup";
import RecommendListItem from "../../CalendarPage/RecommendListItem/RecommendListItem";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { instance } from "../../../api/index";
import { initializeTestList } from "../../../store/planSlice";
import ReportChart from "../../CalendarPage/ReportChart/ReportChart";
import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Confetti from "../../SignUpPage/Confetti/Confetti";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { styled } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import zIndex from "@mui/material/styles/zIndex";

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

function PlanReportPage({ colorSet }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [score, setScore] = useState(0);
  const [detailData, setDetailData] = useState(null);
  const planId = useSelector((state) => state.plan.planId);
  const testList = useSelector((state) => state.plan.testList);
  const dailyMealList = useSelector((state) => state.plan.dailyMealList);
  const [recommendList, setRecommendList] = useState({});
  const [foodNames, setFoodNames] = useState({});
  const [tempData, setTempData] = useState(null);
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

  console.log(
    `userInfo: ${userInfo.dailyCalorie}/${userInfo.dailyCarb}/${userInfo.dailyProtein}/${userInfo.dailyFat}`
  );

  if (detailData) {
    console.log(
      `consume: ${detailData[0].total.calorie}/${detailData[0].total.carb}/${detailData[0].total.protein}/${detailData[0].total.fat}`
    );
  }
  console.log(tempData);

  useEffect(() => {
    if (detailData) {
      let _carb = detailData[0].total.carb;
      let _protein = detailData[0].total.protein;
      let _fat = detailData[0].total.fat;
      const _score = Math.round(
        ((mealScore(_carb, userInfo.dailyCarb) +
          mealScore(_protein, userInfo.dailyProtein) +
          mealScore(_fat, userInfo.dailyFat)) /
          3) *
          100
      );
      setScore(_score);
      setOrigin(_score);
      setTempData({
        dailyCalorie: userInfo.dailyCalorie,
        dailyCarb: userInfo.dailyCarb,
        dailyProtein: userInfo.dailyProtein,
        dailyFat: userInfo.dailyFat,
        totalCalorie: detailData[0].total.calorie,
        totalCarb: detailData[0].total.carb,
        totalProtein: detailData[0].total.protein,
        totalFat: detailData[0].total.fat,
      });
    }
  }, [detailData]);

  useEffect(() => {
    if (planId !== -1 && dailyMealList.length !== 0) {
      setDetailData(
        dailyMealList.filter((item) => {
          return item.id === planId;
        })
      );
    }
  }, [planId, dailyMealList]);

  useEffect(() => {
    if (planId !== -1) {
      instance.get(`/recommend/${planId}`, {}).then((response) => {
        const obj2 = {};
        const obj = {};
        response.data.map((item, index) => {
          obj2[index] = item.name;
          obj[index] = item;
        });
        setRecommendList(obj);
        setFoodNames(obj2);
      });
    }
  }, [planId]);

  function mealScore(total, daily) {
    const corr = 0.1;

    const absRawScore = Math.abs(1 - total / daily);
    const absCorrScore = Math.max(0, absRawScore - corr) / (1 - corr);
    return 1 - absCorrScore;
  }

  useEffect(() => {
    if (detailData) {
      let _carb = detailData[0].total.carb;
      let _protein = detailData[0].total.protein;
      let _fat = detailData[0].total.fat;
      Object.keys(testList).map((item) => {
        _carb += testList[item].carb;
        _protein += testList[item].protein;
        _fat += testList[item].fat;
      });
      const _score = Math.round(
        ((mealScore(_carb, userInfo.dailyCarb) +
          mealScore(_protein, userInfo.dailyProtein) +
          mealScore(_fat, userInfo.dailyFat)) /
          3) *
          100
      );
      console.log(`score: ${_score}`);
      setScore(_score);
    }
  }, [testList]);

  return (
    <div>
      {origin >= 90 ? <Confetti /> : null}
      <div id="top_nav_area">
        <TopHistoryNav
          bonus={() => {
            dispatch(initializeTestList());
          }}
        />
      </div>
      <div className={classes.container}>
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
                <div>아닐 경우 추천이 제대로 이루어지지 않을 수 있어요</div>
              </div>
            </Alert>
          </Stack>
        ) : null}
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
                            <span>{userInfo.dailyCalorie}kcal</span>
                          </div>
                          <div className={classes.tooltip}>
                            <b>탄수화물</b>
                            <span>{userInfo.dailyCarb}g</span>
                          </div>
                          <div className={classes.tooltip}>
                            <b>단백질</b>
                            <span>{userInfo.dailyProtein}g</span>
                          </div>
                          <div className={classes.tooltip}>
                            <b>지방</b>
                            <span>{userInfo.dailyFat}g</span>
                          </div>
                        </div>
                      </React.Fragment>
                    }
                    color="primary"
                    arrow
                  >
                    <i
                      onClick={handleTooltipOpen}
                      style={{ position: "relative" }}
                      className="fa-regular fa-circle-question"
                    ></i>
                  </HtmlTooltip>
                </div>
              </ClickAwayListener>
            </div>

            {tempData ? (
              <ReportChart
                name={foodNames}
                detailData={tempData}
                testList={testList}
              />
            ) : null}
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
    </div>
  );
}
export default PlanReportPage;
