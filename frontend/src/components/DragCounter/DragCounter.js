import { useEffect, useState, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import "./DragCounter.css";

const DragCounter = () => {
  const [draggable, setDraggable] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const animationRef = useRef(undefined);

  console.log(draggable);
  console.log(currentPosition);

  const backToCenter = () => {
    animationRef.current = anime({
      targets: ".stepper",
      translateY: 0,
      duration: 1500,
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
    // setCurrentPosition(0);
  };
  const onMouseUpEventHandler = (event) => {
    setDraggable(false);
    // setCurrentPosition(0);
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
        <img
          src="https://alikinvv.github.io/stepper-iteration/build/img/arrow-top.svg"
          alt=""
          className="arrow-top"
        ></img>
      </div>

      <div
        className="stepper"
        // onMouseDown={onMouseDownEventHandler}
        // onMouseUp={onMouseUpEventHandler}
        // onMouseMove={onMouseMoveEventHandler}
        style={{ transform: `translateY(${currentPosition}px)` }}
      >
        <span className="count first active hide">15</span>
        <span className="count second next"></span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://alikinvv.github.io/stepper-iteration/build/img/arrow-bottom.svg"
          alt=""
          className="arrow-bottom"
        ></img>
      </div>
    </div>
  );
};

export default DragCounter;
