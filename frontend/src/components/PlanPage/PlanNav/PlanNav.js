import classes from "./PlanNav.module.css"

import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { useState } from "react"
import { instance } from "../../../api/index"
import { useDispatch } from "react-redux"
import { registerDailyMealList } from "../../../store/planSlice"
import { NavLink } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"

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

function PlanNav({ title, planId }) {
  const dispatch = useDispatch()
  const [inputName, setName] = useState(title)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleChange = (event) => setName(event.target.value)
  const handleEdit = (event) => {
    event.preventDefault()
    instance
      .put(
        `/foodset/${planId}`,
        {
          name: inputName,
        },
        {}
      )
      .then((response) => {
        instance
          .get("/foodset")
          .then((response) => {
            dispatch(registerDailyMealList(response.data))
          })
          .catch((error) => console.log(error))
        setName(inputName)
        setOpen(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div>
      {planId ? (
        <div className={classes.nav_area}>
          <NavLink to="/plan">
            <div
              className={`${classes.top_nav_item__box} ${classes.top_nav_item__arrow}`}
            >
              <FontAwesomeIcon icon={faAngleLeft} size="xl" />
            </div>
          </NavLink>
          <div className={classes.top_nav_item__text}>{title}</div>
          <div>
            <div className={classes.edit_btn} onClick={handleOpen}>
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <i
                    className="fa-solid fa-pencil"
                    style={{ marginRight: ".3rem" }}
                  ></i>
                  식단 이름 수정하기
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <form className={classes.input}>
                    <input
                      type="text"
                      value={inputName}
                      onChange={handleChange}
                      placeholder="계획 이름을 작성해주세요"
                      autoFocus
                    />
                    <button
                      onClick={handleEdit}
                      className={`${classes.add_btn_2} box_shadow`}
                    >
                      수정하기
                    </button>
                  </form>
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default PlanNav
