import { React, useState, useRef, useEffect } from "react";

// Referenced from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Loading() {
  const [progressValue, setProgressValue] = useState(0);

  useInterval(() => {
    setProgressValue(progressValue + 10);
  }, 100);

  return (
    <>
      <div className="loading">
        <div className="loadingBar">
          <progress
            id="bar"
            class="progress is-large is-info"
            max="100"
            value={progressValue}
          ></progress>
        </div>
      </div>
    </>
  );
}
