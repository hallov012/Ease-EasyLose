import classes from "./AddButtonList.module.css"
import { NavLink } from "react-router-dom"

function AddButtonList() {
  return (
    <div className={classes.container}>
      <NavLink
        to="/add/barcode"
        className={classes.icon}
        activeClassName={classes.activeicon}
      >
        <i class="fa-solid fa-barcode fa-fw"></i>
      </NavLink>
      <NavLink
        to="/add/bundle"
        className={classes.icon}
        activeClassName={classes.activeicon}
      >
        <i class="fa-solid fa-file-import fa-fw"></i>
      </NavLink>
      <NavLink
        to="/add/custom"
        className={classes.icon}
        activeClassName={classes.activeicon}
      >
        <i class="fa-solid fa-folder-plus fa-fw"></i>
      </NavLink>
    </div>
  )
}

export default AddButtonList
