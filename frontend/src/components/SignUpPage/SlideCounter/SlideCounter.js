import { useEffect, useState, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
// import arrow from "../../assets/arrow.svg";
import Arrow from "../../assets/Arrow.svg";
import "./SlideCounter.css";

const SlideCounter = () => {
  const [count, setCount] = useState(100);
  const [draggable, setDraggable] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const animationRef = useRef(undefined);

  const playAnimation = () => {
    animationRef.current = anime({
      targets: ".count",
      duration: 1000,
      scale: [
        {
          value: 1.3,
          duration: 100,
          easing: "easeOutExpo",
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
      if (y - startPosition > 20) {
        playAnimation();
        const temp = (Number(count) - 0.1).toFixed(1);
        setCount(temp);
        setStartPosition(y);
      } else if (y - startPosition < -20) {
        playAnimation();
        const temp = (Number(count) + 0.1).toFixed(1);
        setCount(temp);
        setStartPosition(y);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("touchstart", onMouseDownEventHandler);
    window.addEventListener("touchmove", onMouseMoveEventHandler);
    window.addEventListener("touchend", onMouseUpEventHandler);
    return () => {
      window.removeEventListener("touchstart", onMouseDownEventHandler);
      window.removeEventListener("touchmove", onMouseMoveEventHandler);
      window.removeEventListener("touchend", onMouseUpEventHandler);
    };
  });
  return (
    <div className="drag-counter-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Arrow} alt=""></img>
      </div>

      <div
        className="stepper"
        // onMouseDown={onMouseDownEventHandler}
        // onMouseUp={onMouseUpEventHandler}
        // onMouseMove={onMouseMoveEventHandler}
      >
        <span className="count">{count}</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "-1",
        }}
      >
        <img src={Arrow} alt="" style={{ transform: "rotate(180deg)" }}></img>
      </div>
    </div>
  );
};

export default SlideCounter;
