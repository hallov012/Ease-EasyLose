import "./BottomNav.css";

import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClipboardList,
  faUtensils,
  faChartColumn,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function BottomNav() {
  return (
    <div>
      <div className="navbar">
        <NavLink to="/calendar" activeClassName="navbar__item__active">
          <div className="navbar__item ">
            <span className="navbar__icon">
              <div className="icon">
                <FontAwesomeIcon icon={faCalendarDays} size="xl" />
              </div>
            </span>
          </div>
        </NavLink>
        <NavLink to="/plan" activeClassName="navbar__item__active">
          <div className="navbar__item">
            <span className="navbar__icon">
              <div className="icon">
                <FontAwesomeIcon icon={faClipboardList} size="xl" />
              </div>
            </span>
          </div>
        </NavLink>
        <NavLink to="/main" activeClassName="navbar__item__active">
          <div className="navbar__item">
            <span className="navbar__icon">
              <div className="icon">
                <FontAwesomeIcon icon={faUtensils} size="xl" />
              </div>
            </span>
          </div>
        </NavLink>
        <NavLink to="/chart" activeClassName="navbar__item__active">
          <div className="navbar__item">
            <span className="navbar__icon">
              <div className="icon">
                <FontAwesomeIcon icon={faChartColumn} size="xl" />
              </div>
            </span>
          </div>
        </NavLink>
        <NavLink to="/mypage" activeClassName="navbar__item__active">
          <div className="navbar__item">
            <span className="navbar__icon">
              <div className="icon">
                <FontAwesomeIcon icon={faUser} size="xl" />
              </div>
            </span>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
export default BottomNav;
