import "./TopNav.css"
import * as React from "react"
import TextField from "@mui/material/TextField"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"

function TopNavDate() {
  const [value, setValue] = React.useState(dayjs(new Date()))
  const handleChange = (newValue) => {
    setValue(newValue)
  }

  return (
    <div className="date__input">
      <LocalizationProvider dateAdapter={AdapterDayjs} className="date">
        <MobileDatePicker
          value={value}
          inputFormat="YYYY. MM. DD (dd)"
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <div className="calender__icon">
        <FontAwesomeIcon icon={faCalendarDays} size="xl" />
      </div>
    </div>
  )
}

export default TopNavDate
