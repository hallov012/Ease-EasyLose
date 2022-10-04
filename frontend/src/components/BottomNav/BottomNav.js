import classes from "./BottomNav.module.css"

import { NavLink } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCalendarDays,
  faClipboardList,
  faUtensils,
  faChartColumn,
  faUser,
} from "@fortawesome/free-solid-svg-icons"

function BottomNav() {
  return (
    <div>
      <div className={classes.navbar}>
        <NavLink
          to="/calendar"
          className={classes.navbar__item}
          activeClassName={classes.navbar__item__active}
        >
          <span className={classes.navbar__icon}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faCalendarDays} size="xl" />
            </div>
          </span>
        </NavLink>
        <NavLink
          to="/plan"
          className={classes.navbar__item}
          activeClassName={classes.navbar__item__active}
        >
          <span className={classes.navbar__icon}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faClipboardList} size="xl" />
            </div>
          </span>
        </NavLink>
        <NavLink
          to="/main"
          className={classes.navbar__item}
          activeClassName={classes.navbar__item__active}
        >
          <span className={classes.navbar__icon}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faUtensils} size="xl" />
            </div>
          </span>
        </NavLink>
        <NavLink
          to="/chart"
          className={classes.navbar__item}
          activeClassName={classes.navbar__item__active}
        >
          <span className={classes.navbar__icon}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faChartColumn} size="xl" />
            </div>
          </span>
        </NavLink>
        <NavLink
          to="/mypage"
          className={classes.navbar__item}
          activeClassName={classes.navbar__item__active}
        >
          <span className={classes.navbar__icon}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faUser} size="xl" />
            </div>
          </span>
        </NavLink>
      </div>
    </div>
  )
}
export default BottomNav
