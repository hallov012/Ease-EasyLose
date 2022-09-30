import { useEffect, useState } from "react"
import "./CalendarMainPage.css"
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
} from "date-fns"
import { instance } from "../../api/index"

function CalendarMainPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [monthData, setMonthData] = useState([])
  const [detailClicked, setDetailClicked] = useState(false)

  useEffect(() => {
    instance
      .get("/calendar/", { params: { date: format(currentMonth, "yyyy-MM") } })
      .then((response) => {
        const array = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }, [currentMonth])

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }
  const onDateClick = (day) => {
    setSelectedDate(day)
  }
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy"

    return (
      <>
        <button onClick={(e) => prevMonth(e)}>
          <div className="icon">
            <i className="fas fa-angle-left"></i>
          </div>
        </button>

        <span>{format(currentMonth, dateFormat)}</span>

        <button onClick={(e) => nextMonth(e)}>
          <div className="icon">
            <i className="fas fa-angle-right"></i>
          </div>
        </button>
      </>
    )
  }

  const renderDays = () => {
    const dateFormat = "EEE"
    const days = []

    let startDate = startOfWeek(currentMonth)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      )
    }

    return <div className="week day-labels">{days}</div>
  }

  function showEmotion(score) {
    if (score > 90) {
      return <i class="fa-solid fa-face-laugh-squint"></i>
    } else if (score > 80) {
      return <i class="fa-solid fa-face-smile"></i>
    } else if (score > 70) {
      return <i class="fa-solid fa-face-meh"></i>
    } else {
      ;<i class="fa-solid fa-face-dizzy"></i>
    }
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    const dateFormat = "d"
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ""
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat)
        const cloneDay = day
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
              justifyContent: "space-around",
            }}
            key={day}
            onClick={(e) => {
              onDateClick(cloneDay)
            }}
          >
            <span className="number">{formattedDate}</span>
            <div style={{ fontSize: 30 }}></div>
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className="week" key={day}>
          {days}
        </div>
      )
      days = []
    }

    return <>{rows}</>
  }

  return (
    <div>
      {detailClicked ? (
        <div></div>
      ) : (
        <div className="my-calendar-container">
          <div className="my-calendar">
            <div className="my-calendar-header">{renderHeader()}</div>
            <div className="my-calendar-body">
              {renderDays()}
              {monthData ? renderCells() : null}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalendarMainPage
