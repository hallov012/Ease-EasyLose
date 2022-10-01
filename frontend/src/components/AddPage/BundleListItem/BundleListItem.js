import { useState } from "react"
import BundleMealListItem from "./BundleMealListItem"

import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"

import ListItemText from "@mui/material/ListItemText"
import Collapse from "@mui/material/Collapse"

import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"

function BundleListItem({ item }) {
  const [open, setOpen] = useState(false)
  const mealtime = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"]
  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={item.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {mealtime.map((type, index) => {
            return (
              <BundleMealListItem
                type={type}
                foodList={item.details[`${mealtime[index]}`]}
              ></BundleMealListItem>
            )
          })}
        </List>
      </Collapse>
    </div>
  )
}

export default BundleListItem
