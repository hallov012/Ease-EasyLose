import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Collapse from "@mui/material/Collapse"

import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"

import { useState } from "react"

function BundleMealListItem({ type, foodList }) {
  const [open, setOpen] = useState(true)
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={type} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {foodList.map((food) => {
            return (
              <ListItemButton>
                <ListItemText primary={food.food.name}></ListItemText>
              </ListItemButton>
            )
          })}
        </List>
      </Collapse>
    </div>
  )
}

export default BundleMealListItem
