import TopNav from "../../TopNav/TopNav";
import ToggleButton from "../ToggleButton/ToggleButton";
import { useHistory, useLocation } from "react-router-dom";
import classes from "./AddSearchPage.module.css";
import ListItemCheckBox from "../ListItemCheckBox/ListItemCheckBox";
import AddButtonList from "../AddButtonList/AddButtonList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function AddSearchPage() {
  const location = useLocation();
  const history = useHistory();
  const accessToken = useSelector((state) => state.user.accessToken);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        axios({
          method: "get",
          url: "https://j7a704.p.ssafy.io/api/v1/food",
          params: {
            name: searchTerm,
          },
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then((response) => setSearchResult(response.data))
          .catch((error) => {
            console.log(error);
          });
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  return (
    <div style={{ marginTop: "9vh" }}>
      <div id="top_nav_area">
        <TopNav arrow={[``, ""]}></TopNav>
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
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
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
        {searchResult.map((item, index) => {
          return (
            <ListItemCheckBox key={index} foodInfo={item}></ListItemCheckBox>
          );
        })}
      </div>
      <div
        onClick={() => {
          history.push("/add/basket", { from: location });
        }}
        className={classes.addButtonContainer}
      >
        <div className={classes.addButton}>추가하기</div>
      </div>
      <AddButtonList></AddButtonList>
    </div>
  );
}

export default AddSearchPage;
