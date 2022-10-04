import { Route } from "react-router-dom"
import CalendarMainPage from "../components/CalendarPage/CalendarMainPage"

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
