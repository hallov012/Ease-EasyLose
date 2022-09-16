import "./BottomNav.css"

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
      <div className="navbar">
        <div className="navbar__item navbar__item__active">
          <span className="navbar__icon">
            <div className="icon">
              <FontAwesomeIcon icon={faCalendarDays} size="xl" />
            </div>
          </span>
        </div>
        <div className="navbar__item">
          <span className="navbar__icon">
            <div className="icon">
              <FontAwesomeIcon icon={faClipboardList} size="xl" />
            </div>
          </span>
        </div>
        <div className="navbar__item">
          <span className="navbar__icon">
            <div className="icon">
              <FontAwesomeIcon icon={faUtensils} size="xl" />
            </div>
          </span>
        </div>
        <div className="navbar__item">
          <span className="navbar__icon">
            <div className="icon">
              <FontAwesomeIcon icon={faChartColumn} size="xl" />
            </div>
          </span>
        </div>
        <div className="navbar__item">
          <span className="navbar__icon">
            <div className="icon">
              <FontAwesomeIcon icon={faUser} size="xl" />
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}
export default BottomNav
