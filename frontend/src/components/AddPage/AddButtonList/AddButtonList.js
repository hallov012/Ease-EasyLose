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
        <i className="fa-solid fa-barcode"></i>
        <div>바코드</div>
      </NavLink>
      <NavLink
        to="/add/bundle"
        className={classes.icon}
        activeClassName={classes.activeicon}
      >
        <i className="fa-solid fa-file-import"></i>
        <div>계획 불러오기</div>
      </NavLink>
      <NavLink
        to="/add/custom"
        className={classes.icon}
        activeClassName={classes.activeicon}
      >
        <i className="fa-solid fa-folder-plus"></i>
        <div>커스텀</div>
      </NavLink>
    </div>
  )
}

export default AddButtonList
