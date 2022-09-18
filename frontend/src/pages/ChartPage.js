import TopNavDate from "../components/TopNav/TopNavDate";
import BottomNav from "../components/BottomNav/BottomNav";

function ChartPage() {
  return (
    <div>
      <div id="top_nav_area">
        {/* <TopNav text={"2022.09.15 (목)"} arrow={[0, 1]} /> */}
        <TopNavDate />
      </div>
      <h1>Welcome to ChartPage</h1>
      <div id="bottom_nav_area">
        <BottomNav />
      </div>
    </div>
  );
}

export default ChartPage;
