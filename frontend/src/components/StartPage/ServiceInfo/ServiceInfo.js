import classes from "./ServiceInfo.module.css"
import { Link } from "react-scroll"

function ServiceInfo() {
  return (
    <section className="main">
      <Link to="content" spy={true} smooth={true}>
        <span>알아보기</span>
      </Link>

      <div className={classes.content} id="content">
        <h1>Content Section</h1>
      </div>
    </section>
  )
}
export default ServiceInfo
