import React, { useRef } from "react";
import { fromEvent,  } from 'rxjs';
import { map, buffer, filter, debounceTime } from 'rxjs/operators';

function Buttons(props) {

  const waitButtonRef = useRef()

  let doubleClick = () => {
    const mouse$ = fromEvent(document, 'click')

    const buff$ = mouse$.pipe(
      debounceTime(250),
    )

    const click$ = mouse$.pipe(
      buffer(buff$),
      map(list => {
        return list.length;
      }),
      filter(x => x === 2),
    )
    click$.subscribe(props.wait)
  }

  return (
    <div>
      {props.status === 0 ? (
        <button
          className="stopwatch-btn stopwatch-btn-gre"
          onClick={props.start}
        >
          Start
        </button>
      ) : (
        ""
      )}

      {props.status === 1 ? (
        <div>
          <button
            ref={waitButtonRef}
            className="stopwatch-btn stopwatch-btn-yel"
            onClick={doubleClick()}
          >
            Wait
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-red"
            onClick={props.stop}
          >
            Stop
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-red"
            onClick={props.reset}
          >
            Reset
          </button>
        </div>
      ) : (
        ""
      )}

      {props.status === 2 ? (
        <div>
          <button
            className="stopwatch-btn stopwatch-btn-gre"
            onClick={props.start}
          >
            Start
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-red"
            onClick={props.stop}
          >
            Stop
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-red"
            onClick={props.reset}
          >
            Reset
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Buttons;
