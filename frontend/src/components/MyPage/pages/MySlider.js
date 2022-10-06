import { useState } from "react"
import classes from "./MySlider.module.css"
import * as React from "react"
import Slider from "@mui/material/Slider"
import { styled } from "@mui/material/styles"

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

function MySlider(props) {
  const dataSet = {
    age: {
      nextPath: "height",
      unitLeft: "(만)",
      unitRight: "세",
    },
    height: {
      nextPath: "weight",
      unitLeft: "",
      unitRight: "cm",
    },
    weight: {
      nextPath: "activity",
      unitLeft: "",
      unitRight: "kg",
    },
  }
  const type = props.type

  return (
    <div className={classes.container}>
      <div className={classes.now_value}>
        <p>{dataSet[type].unitLeft}</p>
        <p>{props.value}</p>
        <p>{dataSet[type].unitRight}</p>
      </div>
      <PrettoSlider
        valueLabelDisplay="on"
        aria-label="pretto slider"
        value={props.value}
        step={props.term}
        min={props.range[0]}
        max={props.range[1]}
        onChange={(e) => {
          props.setValue(e.target.value)
        }}
      />
    </div>
  )
}

export default MySlider
