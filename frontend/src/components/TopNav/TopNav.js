import classes from "./TopNav.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"

function TopNav(props) {
  return (
    <div className={classes.top_nav_item_list}>
      <div className={classes.top_nav_item}>
        <div
          className={`${classes.top_nav_item__box} ${classes.top_nav_item__arrow}`}
          style={{ display: props.arrow[0] ? "flex" : "none" }}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="xl" />
        </div>
      </div>
      <div className={`${classes.top_nav_item} ${classes.top_nav_item__text}`}>
        <div className={classes.top_nav_item__box}>{props.text}</div>
      </div>
      <div className={classes.top_nav_item}>
        <div
          className={`${classes.top_nav_item__box} ${classes.top_nav_item__arrow}`}
          style={{ display: props.arrow[1] ? "flex" : "none" }}
        >
          <FontAwesomeIcon icon={faAngleRight} size="xl" />
        </div>
      </div>
    </div>
  )
}

export default TopNav
