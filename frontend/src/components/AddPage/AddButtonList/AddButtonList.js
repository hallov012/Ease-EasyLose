import classes from "./AddButtonList.module.css";
import { NavLink } from "react-router-dom";

function AddButtonList() {
  return (
    <div className={classes.container}>
      <NavLink
        to="/add/search"
        className={classes.icon}
        activeClassName={classes.activeicon}
      >
        <i class="fa-solid fa-circle-plus fa-fw"></i>
      </NavLink>
      <NavLink
        to="/add/basket"
        className={classes.icon}
        activeClassName={classes.activeicon}
      >
        <i class="fa-solid fa-basket-shopping fa-fw"></i>
      </NavLink>
      <NavLink
        to="/add/barcode"
        className={classes.icon}
        activeClassName={classes.activeicon}
      >
        <i class="fa-solid fa-barcode fa-fw"></i>
      </NavLink>
      <NavLink
        to="/add/import"
        className={classes.icon}
        activeClassName={classes.activeicon}
      >
        <i class="fa-solid fa-file-import fa-fw"></i>
      </NavLink>
      <NavLink
        to="/add/camera"
        className={classes.icon}
        activeClassName={classes.activeicon}
      >
        <i class="fa-solid fa-camera fa-fw"></i>
      </NavLink>
      <NavLink
        to="/add/custom"
        className={classes.icon}
        activeClassName={classes.activeicon}
      >
        <i class="fa-solid fa-folder-plus fa-fw"></i>
      </NavLink>
    </div>
  );
}

export default AddButtonList;
