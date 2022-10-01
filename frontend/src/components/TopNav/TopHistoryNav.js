import classes from "./TopNav.module.css"
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"

function TopHistoryNav({ bonus = () => {}, text = "" }) {
  const history = useHistory()
  return (
    <div className={classes.top_nav_item_list}>
      <div className={classes.top_nav_item}>
        <div
          className={`${classes.top_nav_item__box} ${classes.top_nav_item__arrow}`}
          style={{ display: "flex" }}
          onClick={() => {
            history.goBack()
            bonus()
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="xl" />
        </div>
        {text ? (
          <div
            className={`${classes.top_nav_item} ${classes.top_nav_item__text}`}
          >
            <div className={classes.top_nav_item__box}>
              <div>{text}</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default TopHistoryNav
