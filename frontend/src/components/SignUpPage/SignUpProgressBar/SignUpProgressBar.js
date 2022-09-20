import classes from "./SignUpProgressBar.module.css";
import { useEffect, useState } from "react";
function SignUpProgressBar({ done }) {
  return (
    <div className={classes.progress}>
      <div className={classes.progressDone} style={{ width: `${done}%` }}>
        {done}%
      </div>
    </div>
  );
}

export default SignUpProgressBar;
