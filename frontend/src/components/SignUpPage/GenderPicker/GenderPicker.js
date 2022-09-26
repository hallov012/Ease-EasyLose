import classes from "./GenderPicker.module.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
function GenderPicker(props) {
  const history = useHistory();
  const [selected, setSelected] = useState([false, false]);
  useEffect(() => {
    if (props.value === "MALE") setSelected([true, false]);
    else if (props.value === "FEMALE") setSelected([false, true]);
  }, [props.value]);
  return (
    <div className={classes.container}>
      <button
        className={selected[0] ? classes.pickedItem : classes.genderItem}
        onClick={() => {
          props.setGender("MALE");
          setSelected([true, false]);
          history.push("/signup/birth");
        }}
      >
        남성
      </button>
      <button
        className={selected[1] ? classes.pickedItem : classes.genderItem}
        onClick={() => {
          props.setGender("FEMALE");
          setSelected([false, true]);
          history.push("/signup/birth");
        }}
      >
        여성
      </button>
    </div>
  );
}

export default GenderPicker;
