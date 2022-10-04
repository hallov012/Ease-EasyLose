import classes from "./AddBundlePage.module.css"
import TopHistoryNav from "../../TopNav/TopHistoryNav"
import ListSubheader from "@mui/material/ListSubheader"
import List from "@mui/material/List"
import { useEffect, useState } from "react"
import { instance } from "../../../api/index"
import BundleListItem from "../BundleListItem/BundleListItem"

function AddBundlePage() {
  const [open, setOpen] = useState(false)
  const [bundleData, setBundleData] = useState([])
  const handleClick = () => {
    setOpen(!open)
  }

  useEffect(() => {
    instance
      .get("/foodset", {})
      .then((response) => {
        setBundleData(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div>
      <div id="top_nav_area">
        <TopHistoryNav></TopHistoryNav>
      </div>
      <div className={classes.container}>
        <div className={classes.list_container}>
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <div
                  style={{
                    marginTop: "2vh",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    color: "black",
                    fontFamily: "Arita-dotum-Medium",
                  }}
                >
                  식단 목록
                </div>
              </ListSubheader>
            }
          >
            {bundleData.length
              ? bundleData.map((item, index) => {
                  return (
                    <BundleListItem key={index} item={item}></BundleListItem>
                  )
                })
              : null}
          </List>
        </div>
      </div>

      <div className={classes.bcontainer}>
        <div className={classes.icon}>
          <i className="fa-solid fa-file-import fa-fw"></i>
        </div>
      </div>
    </div>
  )
}

export default AddBundlePage
