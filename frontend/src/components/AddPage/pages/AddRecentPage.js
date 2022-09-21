import classes from "./AddRecentPage.module.css";
import TopNav from "../../TopNav/TopNav";
import ToggleButton from "../ToggleButton/ToggleButton";
import { useHistory } from "react-router-dom";

function AddRecentPage() {
  const history = useHistory();
  return (
    <div>
      <div id="top_nav_area">
        <TopNav arrow={["", "/signup/gender"]}></TopNav>
      </div>
      <div className={classes.container}>
        <div
          style={{
            width: "90vw",
            height: "5vh",
            marginTop: "2vh",
            marginBottom: "2vh",
          }}
        >
          <ToggleButton
            info={[
              { path: "/add/search", name: "음식 검색" },
              { path: "/add/recent", name: "최근에 먹은 음식" },
            ]}
          ></ToggleButton>
        </div>
      </div>
    </div>
  );
}

export default AddRecentPage;
