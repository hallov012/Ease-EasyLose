import { useEffect, useState, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import classes from "./SlideCounter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const SlideCounter = (props) => {
  const [draggable, setDraggable] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const animationRef = useRef(undefined);
  const draggerRef = useRef(null);
  // const onMouseMoveEventHandler = useRef((event) => {
  //   console.log(event);
  //   const y = event.clientY || event.touches[0].clientY;

  //   if (y - startPosition > 20) {
  //     playAnimation();
  //     let temp = Number(props.value) - props.point;
  //     if (props.type === "float") temp = temp.toFixed(1);
  //     if (temp >= props.from && temp <= props.to) props.setValue(temp);
  //     setStartPosition(y);
  //   } else if (y - startPosition < -20) {
  //     playAnimation();
  //     let temp = Number(props.value) + props.point;
  //     if (props.type === "float") temp = temp.toFixed(1);
  //     if (temp >= props.from && temp <= props.to) props.setValue(temp);
  //     setStartPosition(y);
  //   }
  // });

  const playAnimation = () => {
    animationRef.current = anime({
      targets: "." + classes.count,
      duration: 1000,
      scaleY: [
        {
          value: 1.3,
          duration: 100,
        },
        { value: 1, duration: 900 },
      ],
    });
  };

  const onMouseDownEventHandler = (event) => {
    const y = event.clientY || event.touches[0].clientY;
    setDraggable(true);
    setStartPosition(y);
  };
  const onMouseUpEventHandler = (event) => {
    setDraggable(false);
  };

  const onMouseMoveEventHandler = (event) => {
    const y = event.clientY || event.touches[0].clientY;

    if (draggable) {
      if (y - startPosition > 10) {
        playAnimation();
        let temp = Number(props.value) - props.point;
        if (props.type === "float") temp = temp.toFixed(1);
        if (temp >= props.from && temp <= props.to) props.setValue(temp);
        setStartPosition(y);
      } else if (y - startPosition < -10) {
        playAnimation();
        let temp = Number(props.value) + props.point;
        if (props.type === "float") temp = temp.toFixed(1);
        if (temp >= props.from && temp <= props.to) props.setValue(temp);
        setStartPosition(y);
      }
    }
  };

  // useEffect(() => {
  //   if (draggable) {
  //     draggerRef.current.addEventListener(
  //       "mousemove",
  //       onMouseMoveEventHandler.current
  //     );
  //   } else {
  //     draggerRef.current.removeEventListener(
  //       "mousemove",
  //       onMouseMoveEventHandler.current
  //     );
  //   }
  // }, [draggable]);
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
    <div
      className={classes.container}
      style={{ width: props.width, height: props.height }}
    >
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Arrow} alt=""></img>
      </div> */}

      <div
        className={classes.dragger}
        ref={draggerRef}
        onMouseDown={onMouseDownEventHandler}
        onMouseUp={onMouseUpEventHandler}
        onMouseMove={onMouseMoveEventHandler}
        onTouchStart={onMouseDownEventHandler}
        onTouchEnd={onMouseUpEventHandler}
        onTouchMove={onMouseMoveEventHandler}
      >
        <div
          style={{
            fontSize: "24px",
          }}
        >
          <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
        </div>
        <div
          className={classes.count}
          // style={{
          //   fontSize: "30px",
          //   color: "black",
          //   width: "50px",
          //   height: "50px",
          // }}
        >
          {props.value} {props.unit}
        </div>
        <div
          style={{
            fontSize: "24px",
          }}
        >
          <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
        </div>
      </div>

      {/* style={{ transform: "rotate(180deg)" }} */}

      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "-1",
        }}
      >
        <img src={Arrow} alt="" style={{ transform: "rotate(180deg)" }}></img>
      </div> */}
    </div>
  );
};

export default SlideCounter;
