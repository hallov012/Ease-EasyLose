import { useEffect, useState, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
// import arrow from "../../assets/arrow.svg";
import Arrow from "../../assets/Arrow.svg";
import "./DragCounter.css";

const DragCounter = () => {
  const [count, setCount] = useState(15);
  const [draggable, setDraggable] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const animationRef = useRef(undefined);

  const backToCenter = () => {
    animationRef.current = anime({
      targets: ".stepper",
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
      setCount((current) => current + 1);
    } else if (currentPosition < 0) {
      setCount((current) => current - 1);
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
        style={{ transform: `translateY(${currentPosition}px)` }}
      >
        <span className="count first active">{count}</span>
        <span className="count second next"></span>
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

export default DragCounter;
