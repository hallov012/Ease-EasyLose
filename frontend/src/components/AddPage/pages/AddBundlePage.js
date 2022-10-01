import classes from "./AddBundlePage.module.css"
import TopHistoryNav from "../../TopNav/TopHistoryNav"
import ListSubheader from "@mui/material/ListSubheader"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Collapse from "@mui/material/Collapse"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import DraftsIcon from "@mui/icons-material/Drafts"
import SendIcon from "@mui/icons-material/Send"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import StarBorder from "@mui/icons-material/StarBorder"
import { useEffect, useState } from "react"
import { instance } from "../../../api/index"
import BundleListItem from "../BundleListItem/BundleListItem"

function AddBundlePage() {
  const [open, setOpen] = useState(true)
  const [bundleData, setBundleData] = useState([])
  const handleClick = () => {
    setOpen(!open)
  }

  useEffect(() => {
    instance
      .get("/foodset", {})
      .then((response) => {
        console.log(response.data)
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
                식단 목록
              </ListSubheader>
            }
          >
            {bundleData.length
              ? bundleData.map((item) => {
                  return <BundleListItem item={item}></BundleListItem>
                })
              : null}
            {/* <ListItemButton>
              <ListItemText primary="Sent mail" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Drafts" />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Inbox" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse> */}
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
