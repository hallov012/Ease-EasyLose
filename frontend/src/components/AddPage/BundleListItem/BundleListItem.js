import { useState } from "react"
import BundleMealListItem from "./BundleMealListItem"

import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"

import ListItemText from "@mui/material/ListItemText"
import Collapse from "@mui/material/Collapse"

import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"

import Typography from "@mui/material/Typography"

function BundleListItem({ item }) {
  const [open, setOpen] = useState(false)
  const mealtime = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"]
  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          primary={
            <Typography
              style={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                fontFamily: "Arita-dotum-Medium",
              }}
            >
              {item.name}
            </Typography>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {mealtime.map((type, index) => {
            if (item.details[`${mealtime[index]}`].length !== 0) {
              return (
                <BundleMealListItem
                  key={index}
                  type={type}
                  foodList={item.details[`${mealtime[index]}`]}
                ></BundleMealListItem>
              )
            }
          })}
        </List>
      </Collapse>
    </div>
  )
}

export default BundleListItem
