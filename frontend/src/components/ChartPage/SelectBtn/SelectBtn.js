import classes from "./SelectBtn.module.css"

import { useState, useEffect } from "react"

function SelectBtn({ setValue, data, def = 0 }) {
  const [select, setSelect] = useState(0)
  const clickItem = (e) => {
    e.preventDefault()
    setSelect(parseInt(e.target.id))
  }

  useEffect(() => {
    setSelect(def)
  }, [])

  useEffect(() => {
    setValue(select)
  }, [select])

  return (
    <div className={classes.container}>
      <div className={classes.selector}>
        <div
          className={classes.highlight}
          style={{ left: select ? "50vw" : "6vw" }}
        ></div>
        <div className={classes.selector_item} onClick={clickItem} id="0">
          {data[0]}
        </div>
        <div className={classes.selector_item} onClick={clickItem} id="1">
          {data[1]}
        </div>
      </div>
    </div>
  )
}
export default SelectBtn
