
import { useState, useEffect } from "react";
import '../css/Timer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlarmClock, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { faStop } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

function Timer() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval;

        if (running) {
            interval = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [running]);

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return (
        <div>
            <h4>Timer</h4>

            <p className="timer-para" style={{ fontSize: "24px", fontWeight: "bold" }}>
                <FontAwesomeIcon icon={faAlarmClock} />
                {formatTime()}
            </p>

            {!running && time === 0 && (
                <button className="timer-btn" onClick={() => setRunning(true)}><FontAwesomeIcon icon={faCirclePlay} />Start</button>
            )}

            {running && (
                <button className="timer-btn" onClick={() => setRunning(false)}><FontAwesomeIcon icon={faStop} />Pause</button>
            )}

            {!running && time !== 0 && (
                <button className="timer-btn" onClick={() => setRunning(true)}><FontAwesomeIcon icon={faPlay} />Resume</button>
            )}

            {time !== 0 && (
                <button className="timer-btn" onClick={() => { setTime(0); setRunning(false); }}>
                    <FontAwesomeIcon icon={faRotateLeft} />Reset
                </button>
            )}
        </div>
    );
}

export default Timer;
