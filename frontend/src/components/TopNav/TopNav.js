import classes from "./TopNav.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"

import { NavLink } from "react-router-dom"

function TopNav(props) {
  return (
    <div className={classes.top_nav_item_list}>
      <div className={classes.top_nav_item}>
        <NavLink
          className={`${classes.top_nav_item__box} ${classes.top_nav_item__arrow}`}
          style={{ display: props.arrow[0] ? "flex" : "none" }}
          to={props.arrow[0]}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="xl" />
        </NavLink>
      </div>
      <div className={`${classes.top_nav_item} ${classes.top_nav_item__text}`}>
        <div className={classes.top_nav_item__box}>
          <div>{props.text}</div>
        </div>
      </div>
      <div className={classes.top_nav_item}>
        <NavLink
          className={`${classes.top_nav_item__box} ${classes.top_nav_item__arrow}`}
          style={{ display: props.arrow[1] ? "flex" : "none" }}
          to={props.arrow[1]}
        >
          <FontAwesomeIcon icon={faAngleRight} size="xl" />
        </NavLink>
      </div>
    </div>
  )
}

export default TopNav
