import "./App.css"
// import TopNav from "./TopNav"
import TopNavDate from "./TopNavDate"
import BottomNav from "./BottomNav"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="top_line_gradient"></div>
        <div id="top_nav_area">
          {/* <TopNav text={"2022.09.15 (목)"} arrow={[0, 1]} /> */}
          <TopNavDate />
        </div>
      </header>
      <body></body>
      <div id="bottom_nav_area">
        <BottomNav />
      </div>
    </div>
  )
}

export default App
