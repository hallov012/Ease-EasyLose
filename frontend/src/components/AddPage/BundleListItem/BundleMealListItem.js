import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import "./BundleMealList.css"

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import ListItemIcon from "@mui/material/ListItemIcon"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"

import { useState } from "react"
import { flexbox } from "@mui/system"

import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { registerItem } from "../../../store/basketSlice"

const style = {
  position: "absolute",
  maxWidth: "350px",
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

function BundleMealListItem({ type, foodList }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleClick = () => {
    setOpen(!open)
  }

  function addBundle() {
    foodList.map((food) => {
      dispatch(registerItem({ ...food.food, count: food.count }))
    })
    history.goBack()
  }

  function showType(type) {
    if (type === "BREAKFAST") return "아침"
    else if (type === "LUNCH") return "점심"
    else if (type === "DINNER") return "저녁"
    else return "간식"
  }

  return (
    <div>
      <ListItemButton
        onClick={() => {
          setOpen(true)
        }}
      >
        <ListItemText
          primary={
            <Typography
              style={{
                color: "gray",
                fontSize: "1.1rem",
                fontFamily: "Arita-dotum-Medium",
              }}
            >
              {showType(type)}
            </Typography>
          }
        />
        <AddCircleOutlineIcon style={{ color: "gray" }} />
      </ListItemButton>
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
            추가될 목록입니다!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div style={{}} className="noScroll">
              {foodList.map((foodInfo) => {
                return (
                  <div
                    key={foodInfo.id}
                    style={{ width: "100%", height: "8vh" }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingLeft: "2vw",
                        paddingRight: "2vw",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          height: "100%",
                          width: "40%",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            display: "block",

                            width: "100%",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            textAlign: "left",
                            fontFamily: "Arita-dotum-Medium",
                          }}
                        >
                          {foodInfo.food.name}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          justifyContent: "space-evenly",
                          height: "100%",
                          width: "60%",
                          fontFamily: "Arita-dotum-Medium",
                        }}
                      >
                        <div>{`${Math.round(foodInfo.food.calorie)} kcal X ${
                          foodInfo.count
                        }`}</div>
                        <div>{`${
                          foodInfo.food.calorie * foodInfo.count
                        } kcal`}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                marginTop: "2vh",
              }}
            >
              <div
                onClick={addBundle}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "45%",
                  height: "5vh",
                  borderRadius: "10px",

                  color: "white",
                  backgroundColor: "var(--main-color)",
                  fontSize: "1.1rem",
                  fontFamily: "Arita-dotum-Medium",
                }}
              >
                추가하기
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  width: "45%",
                  height: "5vh",
                  color: "black",
                  backgroundColor: "var(--gray-color)",
                  fontSize: "1.1rem",
                  fontFamily: "Arita-dotum-Medium",
                }}
                onClick={handleClose}
              >
                취소
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default BundleMealListItem
