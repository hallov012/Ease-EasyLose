import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { useState } from "react"
import { instance } from "../../../api/index"
import { useDispatch } from "react-redux"
import { registerDailyMealList } from "../../../store/planSlice"

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

import classes from "./PlanAddBtn.module.css"

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

function PlanAddBtn() {
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch()
  const [inputName, setName] = useState("")
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleChange = (event) => setName(event.target.value)
  const handleAdd = (event) => {
    event.preventDefault()
    instance
      .post(
        "/foodset",
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
            MySwal.fire({
              icon: "success",
              text: "생성되었습니다!",
              showConfirmButton: false,
              timer: 1500,
            })
          })
          .catch((error) => console.log(error))
        setName("")
        setOpen(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div style={{ width: "100%" }}>
      <div
        className={`${classes.add_btn} gradient_color__horizon box_shadow`}
        onClick={handleOpen}
      >
        추가하기
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <i class="fa-solid fa-burger" style={{ marginRight: ".3rem" }}></i>
            새로운 식단 계획 추가하기
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
                onClick={handleAdd}
                className={`${classes.add_btn_2} box_shadow`}
              >
                생성하기
              </button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
export default PlanAddBtn
