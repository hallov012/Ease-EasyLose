import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"

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
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
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

  return (
    <div>
      <ListItemButton
        onClick={() => {
          setOpen(true)
        }}
      >
        <ListItemText
          primary={
            <Typography style={{ color: "gray", fontSize: "1.1rem" }}>
              {type}
            </Typography>
          }
        />
        <AddCircleOutlineIcon style={{ color: "gray" }} />
      </ListItemButton>
      {/* <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {foodList.map((food) => {
            return (
              <ListItemButton>
                <ListItemText primary={food.food.name}></ListItemText>
              </ListItemButton>
            )
          })}
        </List>
      </Collapse> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ fontSize: "1.3rem", fontWeight: "bold" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            추가될 목록입니다!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div style={{ overflow: "scroll", height: "50vh" }}>
              {foodList.map((foodInfo) => {
                return (
                  <div style={{ width: "100%", height: "8vh" }}>
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
                  backgroundColor: "rgb(48, 133, 214)",
                  fontSize: "1.1rem",
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
                  color: "white",
                  backgroundColor: "rgb(221, 51, 51)",
                  fontSize: "1.1rem",
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
