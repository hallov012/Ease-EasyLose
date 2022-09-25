import { useState } from "react";
import "./CalendarMainPage.css";
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
} from "date-fns";

function CalendarMainPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

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
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="week day-labels">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
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
            key={day}
            onClick={(e) => {
              onDateClick(cloneDay);
              // isDisabled(day.dateValue) ? null : selectDay(day.dateValue)
            }}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="week" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <>{rows}</>;
  };

  return (
    <div className="my-calendar-container">
      <div className="my-calendar">
        <div className="my-calendar-header">{renderHeader()}</div>
        <div className="my-calendar-body">
          {renderDays()}
          {renderCells()}
        </div>
      </div>
    </div>
  );
}

export default CalendarMainPage;
