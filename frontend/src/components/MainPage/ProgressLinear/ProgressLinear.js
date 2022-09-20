import classes from "./ProgressLinear.module.css"

import * as React from "react"
import LinearProgress from "@mui/material/LinearProgress"

function ProgressLinear() {
  const progress_value = [60, 80, 50]
  return (
    <div className={classes.progress_box}>
      <div className={classes.progress_item}>
        <div className={classes.nutrient_text}>탄수화물</div>
        <LinearProgress
          variant="determinate"
          value={progress_value[0]}
          color="inherit"
        />
      </div>
      <div className={classes.progress_item}>
        <div className={classes.nutrient_text}>단백질</div>
        <LinearProgress
          variant="determinate"
          value={progress_value[1]}
          color="inherit"
        />
      </div>
      <div className={classes.progress_item}>
        <div className={classes.nutrient_text}>지방</div>
        <LinearProgress
          variant="determinate"
          value={progress_value[2]}
          color="inherit"
        />
      </div>
    </div>
  )
}
export default ProgressLinear
