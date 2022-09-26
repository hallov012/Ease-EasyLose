import classes from "./SelectBtn.module.css"

import { useState, useEffect } from "react"

function SelectBtn(props) {
  const [select, setSelect] = useState(0)
  const clickItem = (e) => {
    e.preventDefault()
    setSelect(parseInt(e.target.id))
  }

  useEffect(() => {
    props.setValue(select)
  }, [select])

  return (
    <div className={classes.container}>
      <div className={classes.selector}>
        <div
          className={classes.highlight}
          style={{ left: select ? "50vw" : "6vw" }}
        ></div>
        <div className={classes.selector_item} onClick={clickItem} id="0">
          {props.data[0]}
        </div>
        <div className={classes.selector_item} onClick={clickItem} id="1">
          {props.data[1]}
        </div>
      </div>
    </div>
  )
}
export default SelectBtn
