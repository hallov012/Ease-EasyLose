import classes from "./ListItem.module.css"

import * as React from "react"
import { styled } from "@mui/material/styles"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Typography from "@mui/material/Typography"
import Zoom from "@mui/material/Zoom"
import { useDispatch } from "react-redux"
import { removeDailyMealItem, registerPlanId } from "../../../store/planSlice"
import { instance } from "../../../api"
import { NavLink, useHistory } from "react-router-dom"

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#afb4ff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#afb4ff",
  },
}))

function ListItem({ data }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [open, setOpen] = React.useState(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  const handelDelete = (event) => {
    event.preventDefault()
    instance
      .delete(`/foodset/${data.id}`, {})
      .then((response) => {
        dispatch(removeDailyMealItem(data))
      })
      .catch((error) => console.log(error))
  }

  const handleId = (event) => {
    event.preventDefault()
    localStorage.setItem("target_date", JSON.stringify(data.id))
    dispatch(registerPlanId(data.id))
    history.push(`/plan/${data.id}`)
  }
  return (
    <div className={classes.container}>
      <div onClick={handleId} className={classes.left}>
        <div className={classes.item_title}>{data.name}</div>
        <div className={classes.item_subtitle}>
          총 칼로리: {data.total.calorie}kcal
        </div>
      </div>
      <div className={classes.right}>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
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
              placement="top"
              title={
                <React.Fragment>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <b>탄수화물</b> <span>{data.total.carb}g</span>
                    </div>
                    <div>
                      <b>단백질</b> <span>{data.total.protein}g</span>
                    </div>
                    <div>
                      <b>지방</b> <span>{data.total.fat}g</span>
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
              ></i>
            </HtmlTooltip>
          </div>
        </ClickAwayListener>
        <div onClick={handelDelete}>
          <i className="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
  )
}

export default ListItem
