import { useEffect } from "react"
import classes from "./RecommendListItem.module.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { checkTestItem, unCheckTestItem } from "../../../store/planSlice"
import { useHistory } from "react-router-dom"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  border: "none",
  outline: "none",
}

function RecommendListItem({ foodInfo, reason, index }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false)
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  function onClickHandler() {
    setOpen(true)
  }

  function onCheckHandler() {
    if (checked) {
      dispatch(unCheckTestItem(index))
    } else {
      dispatch(checkTestItem({ [index]: foodInfo }))
    }
    setChecked(checked ? false : true)
  }

  return (
    <div className={classes.Wcontainer}>
      <div className={classes.left}>
        <div className={classes.item_title}> {foodInfo.name}</div>
        <div className={classes.item_subtitle}>
          {/* 여기다 넣어야 합니다 */}
          {/* reason ex) carb protein fat 이런식으로 해당되는 영양소의 단어 문자열이 날아온다 */}
          {/* 있는 단어에 맞게 라벨을 넣어야 할 듯! */}
        </div>
      </div>
      <div className={classes.right}>
        <div onClick={onCheckHandler} style={{ marginRight: "20%" }}>
          {checked ? (
            <i className="fa-solid fa-square-check"></i>
          ) : (
            <i className="fa-regular fa-square-check"></i>
          )}
        </div>
        <div onClick={onClickHandler}>
          <i className="fa-regular fa-circle-question"></i>
        </div>
      </div>
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
            <div>{foodInfo.name}</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
          <div className={classes.container}>
            <div style={{ width: "90%" }}>
              <div className={classes.header2}>
                {/* <div style={{ fontSize: 14, marginBottom: "1vh" }}>
              1회 분량 기준입니다
            </div> */}
                <div style={{ fontSize: 14, fontWeight: 700 }}>영양정보</div>
              </div>
              <div className={classes.itemList}>
                <div className={classes.item}>
                  <div>칼로리</div>
                  <div>{foodInfo.calorie}kcal</div>
                </div>
                <div className={classes.item}>
                  <div>탄수화물</div>
                  <div>{foodInfo.carb}g</div>
                </div>
                <div className={classes.item}>
                  <div>단백질</div>
                  <div>{foodInfo.protein}g</div>
                </div>
                <div className={classes.item}>
                  <div>지방</div>
                  <div>{foodInfo.fat}g</div>
                </div>
              </div>
            </div>
            <div className={classes.detailcontainer}>
              <div className={classes.detailTitle}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>
                  상세 영양정보
                </div>
                <div>{foodInfo.total_amount}</div>
              </div>
              <div className={classes.detailBig}>
                <div>열량</div>
                <div>{foodInfo.calorie}kcal</div>
              </div>
              <div className={classes.detailBig}>
                <div>탄수화물</div>
                <div>{foodInfo.carb}g</div>
              </div>
              <div className={classes.detailSmall}>
                <div className={classes.detailSmallSmall}>
                  <div>당</div>
                  <div>{foodInfo.sugar}g</div>
                </div>
              </div>
              <div className={classes.detailBig}>
                <div>단백질</div>
                <div>{foodInfo.protein}g</div>
              </div>
              <div className={classes.detailBig}>
                <div>지방</div>
                <div>{foodInfo.fat}g</div>
              </div>
              <div className={classes.detailSmall}>
                <div className={classes.detailSmallSmall}>
                  <div>포화지방</div>
                  <div>{foodInfo.saturated_fat}g</div>
                </div>
              </div>
              <div className={classes.detailSmall}>
                <div className={classes.detailSmallSmall}>
                  <div>트랜스지방</div>
                  <div>{foodInfo.trans_fat}g</div>
                </div>
              </div>
              <div className={classes.detailSmall}>
                <div className={classes.detailSmallSmall}>
                  <div>콜레스트롤</div>
                  <div>{foodInfo.cholesterol}g</div>
                </div>
              </div>
              <div className={classes.detailSmall}>
                <div className={classes.detailSmallSmall}>
                  <div>나트륨</div>
                  <div>{foodInfo.salt}g</div>
                </div>
              </div>
            </div>
            <div
              onClick={() => {
                setOpen(false)
              }}
              className={classes.closebutton}
            >
              확인
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default RecommendListItem
