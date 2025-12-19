import React, { useState } from "react";
import "../css/Calendar.css";

function Calendar({ streakDays = [] }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of month
    const firstDay = new Date(year, month, 1).getDay();
    // Number of days in month
    const totalDays = new Date(year, month + 1, 0).getDate();

    const daysArray = [];

    // Fill empty days at start
    for (let i = 0; i < firstDay; i++) daysArray.push(null);

    // Fill actual month days
    for (let d = 1; d <= totalDays; d++) daysArray.push(d);

    const today = new Date();

    const isToday = (d) =>
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

    // Helper to format date as YYYY-MM-DD local time
    const formatDateKey = (day) => {
        if (!day) return null;
        // We use month + 1 because JS months are 0-indexed
        const m = String(month + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${year}-${m}-${d}`;
    };

    const isStreakDay = (d) => {
        if (!d) return false;
        const dateKey = formatDateKey(d);
        return streakDays.includes(dateKey);
    };
    const goToPrevMonth = () => {
        setCurrentDate(new Date(year, month - 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1));
    };

    return (
        <div className="calendar-container">

            <div className="calendar-header-row">
                <button className="month-arrow" onClick={goToPrevMonth}>←</button>

                <h3 className="calendar-header">
                    {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h3>

                <button className="month-arrow" onClick={goToNextMonth}>→</button>
            </div>

            <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d} className="calendar-day-name">{d}</div>
                ))}

                {daysArray.map((day, index) => {
                    const dateKey = formatDateKey(day);
                    const dayClass = [
                        "calendar-day",
                        day === null ? "empty" : "",
                        isToday(day) ? "today" : "",
                        isStreakDay(day) ? "streak" : ""
                    ]
                        .join(" ")
                        .trim();

                    return (
                        <div key={index} className={dayClass}>
                            {day || ""}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Calendar;
