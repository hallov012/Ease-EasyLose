import TopNav from "../../TopNav/TopNav";
import ToggleButton from "../ToggleButton/ToggleButton";
import { useHistory } from "react-router-dom";
import classes from "./AddSearchPage.module.css";
import ListItemCheckBox from "../ListItemCheckBox/ListItemCheckBox";
import AddButtonList from "../AddButtonList/AddButtonList";

function AddSearchPage() {
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
        <div className={classes.scontainer}>
          <input
            style={{
              width: "75vw",
              height: "5vh",
              border: "2px solid #00033F",
              borderRadius: 5,
              background: "#FDFCFC",
            }}
          ></input>
          <div
            style={{
              fontSize: 30,
              marginRight: 10,
            }}
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <ListItemCheckBox></ListItemCheckBox>
        <ListItemCheckBox></ListItemCheckBox>
        <ListItemCheckBox></ListItemCheckBox>
      </div>
      <div className={classes.addButtonContainer}>
        <div className={classes.addButton}>추가하기</div>
      </div>
      <AddButtonList></AddButtonList>
    </div>
  );
}

export default AddSearchPage;
