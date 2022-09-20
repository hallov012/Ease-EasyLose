import TopNavDate from "../../../components/TopNav/TopNavDate"
import NutrientSummary from "../NutrientSummary/NutrientSummary"
import SumProgressBar from "../SumProgressBar/SumProgressBar"

function DailyDietPage() {
  return (
    <div>
      <div id="top_nav_area">
        <TopNavDate />
      </div>
      <div style={{ margin: "0 20px" }}>
        <NutrientSummary />
        <SumProgressBar />
      </div>
    </div>
  )
}
export default DailyDietPage
