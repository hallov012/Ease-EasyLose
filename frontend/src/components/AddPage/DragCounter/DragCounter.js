import { useEffect, useState, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import classes from "./DragCounter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { ClassNames } from "@emotion/react";

const DragCounter = (props) => {
  const [draggable, setDraggable] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const animationRef = useRef(undefined);

  const backToCenter = () => {
    animationRef.current = anime({
      targets: "." + classes.stepper,
      translateY: 0,
      duration: 1000,
      scaleY: [
        {
          value: 1.5,
          duration: 100,
          easing: "easeOutExpo",
        },
        { value: 1, duration: 900 },
      ],
    });
  };

  const onMouseDownEventHandler = (event) => {
    if (animationRef.current) {
      animationRef.current.pause();
      animationRef.current.remove(animationRef);
      animationRef.current = null;
    }
    const y = event.clientY || event.touches[0].clientY;
    setDraggable(true);
    setStartPosition(y);
    setCurrentPosition(0);
  };
  const onMouseUpEventHandler = (event) => {
    if (currentPosition > 0) {
      const temp = (Number(props.value) - 0.5).toFixed(1);
      if (temp >= 0) props.setValue(temp);
    } else if (currentPosition < 0) {
      props.setValue((current) => (Number(current) + 0.5).toFixed(1));
    }
    setDraggable(false);
    backToCenter();
  };
  const onMouseMoveEventHandler = (event) => {
    const y = event.clientY || event.touches[0].clientY;

    if (draggable) {
      setCurrentPosition(y - startPosition);
    }
  };
  // useEffect(() => {
  //   window.addEventListener("touchstart", onMouseDownEventHandler);
  //   window.addEventListener("touchmove", onMouseMoveEventHandler);
  //   window.addEventListener("touchend", onMouseUpEventHandler);
  //   return () => {
  //     window.removeEventListener("touchstart", onMouseDownEventHandler);
  //     window.removeEventListener("touchmove", onMouseMoveEventHandler);
  //     window.removeEventListener("touchend", onMouseUpEventHandler);
  //   };
  // });
  return (
    <div className={classes.container} style={{ height: props.height }}>
      <div
        style={{
          fontSize: 24,
        }}
      >
        <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
      </div>
      <div className={classes.scontainer}>
        <div style={{ visibility: "hidden", fontSize: 20 }}>{props.unit}</div>
        <div style={{ visibility: "hidden", fontSize: 20 }}>{props.unit}</div>
        <div
          className={classes.stepper}
          onMouseDown={onMouseDownEventHandler}
          onMouseUp={onMouseUpEventHandler}
          onMouseMove={onMouseMoveEventHandler}
          onTouchStart={onMouseDownEventHandler}
          onTouchEnd={onMouseUpEventHandler}
          onTouchMove={onMouseMoveEventHandler}
          style={{ transform: `translateY(${currentPosition}px)` }}
        >
          <span className={classes.count}>{props.value}</span>
          <span className={classes.count}></span>
        </div>
        <div style={{ visibility: "hidden", fontSize: 20 }}>{props.unit}</div>
        <div style={{ fontSize: 20 }}>{`${props.unit}`}</div>
      </div>
      <div
        style={{
          fontSize: 24,
        }}
      >
        <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default DragCounter;
