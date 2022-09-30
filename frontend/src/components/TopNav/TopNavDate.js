import classes from "./TopNav.module.css"
import * as React from "react"
import TextField from "@mui/material/TextField"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { registerTargetDate } from "../../store/statusSlice"

function TopNavDate() {
  const target_date = JSON.parse(
    useSelector((state) => state.status.targetDate)
  )
  // const [value, setValue] = React.useState(dayjs(new Date()))
  const dispatch = useDispatch()
  const handleChange = (value) => {
    localStorage.setItem("target_date", JSON.stringify(value))
    dispatch(registerTargetDate(JSON.stringify(value)))
  }

  return (
    <div className={classes.date__input}>
      <LocalizationProvider dateAdapter={AdapterDayjs} className="date">
        <MobileDatePicker
          value={target_date ? target_date : new Date()}
          inputFormat="YYYY. MM. DD (ddd)"
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <div className={classes.calender__icon}>
        <FontAwesomeIcon icon={faCalendarDays} size="xl" />
      </div>
    </div>
  )
}

export default TopNavDate
