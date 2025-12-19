import { NavLink } from "react-router-dom";
import '../css/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faClipboardList, faHome, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

function NavBar() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // updates every second

        return () => clearInterval(interval);
    }, []);

    const formattedDate = currentTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                Daily Planner
            </div>
            <div className="navbar-divider"></div>
            <div className="navbar-links">
                <NavLink to='/' className="nav-link" end>
                    <FontAwesomeIcon icon={faCalendar} />
                    Habits</NavLink>
                <NavLink to='/todolist' className="nav-link">
                    <FontAwesomeIcon icon={faClipboardList} />To-Do List</NavLink>
                <div className="navbar-date-header">
                    Today: {formattedDate}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;