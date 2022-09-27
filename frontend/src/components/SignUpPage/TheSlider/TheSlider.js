import classes from "./TheSlider.module.css"
import * as React from "react"
import Slider from "@mui/material/Slider"
import { styled } from "@mui/material/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { data } from "jquery"

const PrettoSlider = styled(Slider)({
  color: "#7c83fd",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 15,
    background: "unset",
    padding: 0,
    width: 40,
    height: 40,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#7c83fd",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
})

function TheSlider(props) {
  const [value, setValue] = useState(props.value)
  const dataSet = {
    age: {
      nextPath: "height",
      unitLeft: "(만)",
      unitRight: "세",
    },
    height: {
      nextPath: "height",
      unitLeft: "",
      unitRight: "cm",
    },
    weight: {
      nextPath: "height",
      unitLeft: "",
      unitRight: "kg",
    },
  }
  const type = props.type

  return (
    <div className={classes.container}>
      <div className={classes.now_value}>
        <p>{dataSet[type].unitLeft}</p>
        <p>{value}</p>
        <p>{dataSet[type].unitRight}</p>
      </div>
      <PrettoSlider
        valueLabelDisplay="on"
        aria-label="pretto slider"
        defaultValue={props.value}
        step={props.term}
        min={props.range[0]}
        max={props.range[1]}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />

      <div className={classes.addButtonContainer}>
        <NavLink
          to={`/signup/${dataSet[type].nextPath}`}
          className={classes.addButton}
        >
          입력 완료
        </NavLink>
      </div>
    </div>
  )
}
export default TheSlider
