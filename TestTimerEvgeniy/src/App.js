import React, { useState } from "react";
import "./App.css";
import Buttons from "./Components/Buttons";
import TimerDisplay from "./Components/TimerDisplay";
import { Observable } from "rxjs";

let App = () => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);


  const startStream$ = new Observable((observer) => {
    observer.next(setStatus(1));
    observer.next(setInterv(setInterval(run, 10)));
  });
  const stopStream$ = new Observable((observer) => {
    observer.next(clearInterval(interv));
    observer.next(setStatus(0));
    observer.next(setTime({ ms: 0, s: 0, m: 0, h: 0 }));
  });
  const waitStream$ = new Observable((observer) => {
    observer.next(clearInterval(interv));
    observer.next(setStatus(2));
  });
  const resetStream$ = new Observable((observer) => {
    observer.next(clearInterval(interv));
    observer.next(setTime({ ms: 0, s: 0, m: 0, h: 0 }));
  });

  const start = () => {
    startStream$.subscribe(() => {});
  };

  let updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    // debugger
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const stop = () => {
    stopStream$.subscribe(() => {});
  };

  const wait = () => {
    waitStream$.subscribe(() => {});
  };

  const reset = () => {
    resetStream$.subscribe(() => {});
  }
  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <TimerDisplay time={time} />
          <Buttons
            status={status}
            reset={reset}
            wait={wait}
            start={start}
            stop={stop}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
