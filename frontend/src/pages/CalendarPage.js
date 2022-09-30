import { Route } from "react-router-dom"
import CalendarDetailPage from "../components/CalendarPage/CalendarDetailPage"
import CalendarMainPage from "../components/CalendarPage/CalendarMainPage"
import TopNavDate from "../components/TopNav/TopNavDate"

function CalendarPage() {
  return (
    <div>
      <Route path="/calendar" exact>
        <CalendarMainPage></CalendarMainPage>
      </Route>
    </div>
  )
}

export default CalendarPage
