import TopNavDate from "../components/TopNav/TopNavDate";

function MainPage() {
  return (
    <div>
      <div id="top_nav_area">
        {/* <TopNav text={"2022.09.15 (목)"} arrow={[0, 1]} /> */}
        <TopNavDate />
      </div>
      <h1>Welcome to MainPage</h1>
    </div>
  );
}

export default MainPage;
