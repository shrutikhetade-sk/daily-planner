import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen, faCheck, faXmark, faFire } from '@fortawesome/free-solid-svg-icons';
import Calendar from "../components/Calendar";
import '../css/Habits.css'
import { useState, useEffect } from "react";
import habitsData from "../assets/data//habits.json";

function Habits() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        setTasks(habitsData);
    }, []);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    var totalStreak = 7;
    const [userStreak, setUserStreak] = useState([
        "2025-12-11",
        "2025-12-12",
        "2025-12-13",
        "2025-12-14",
        "2025-12-15",
        "2025-12-16",
        "2025-12-17",
    ]);

    // This checks if any task in the array has completed === true
    const hasCompletedAtLeastOne = tasks.some(t => t.completed);

    totalStreak = hasCompletedAtLeastOne ? totalStreak + 1 : totalStreak;

    const addTask = () => {
        if (task.trim() === "") return;

        setTasks([
            ...tasks,
            {
                id: Date.now(),
                text: task,
                completed: false
            }
        ]);
        setTask("");
    };

    const toggleComplete = (id) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(t =>
                t.id === id ? { ...t, completed: !t.completed } : t
            );

            // 1. Check if ANY task is still completed in the new list
            const isAnythingDone = updatedTasks.some(t => t.completed);

            // 2. Generate a unique string: "2025-12-18"
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const todayKey = `${year}-${month}-${day}`;

            setUserStreak(prev => {
                if (isAnythingDone) {
                    return prev.includes(todayKey) ? prev : [...prev, todayKey];
                } else {
                    return prev.filter(date => date !== todayKey);
                }
            });

            return updatedTasks;
        });
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const startEdit = (task) => {
        setEditingId(task.id);
        setEditText(task.text);
    };

    const saveEdit = (id) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, text: editText } : t
        ));
        setEditingId(null);
        setEditText("");
    };


    return (
        <div className="layout-container">
            <div className='main-habit-content'>
                <div className="input-group">
                    <input placeholder="Add a New Habit" value={task} className='habit-input'
                        onChange={(e) => setTask(e.target.value)}></input>
                    <span>
                        <button onClick={addTask} className='add-button'>
                            <FontAwesomeIcon icon={faPlus} />Add Habit
                        </button>
                    </span>
                </div>

                {/* Show message if no tasks */}
                {tasks.length === 0 && (
                    <>
                        <div className='habit-main'>
                            <p>No Habits yet</p>
                            <p>Add your first habit to start building consistency!</p>
                        </div>
                    </>
                )}

                {/* Display Habits */}
                <ul className="habit-list">
                    {tasks
                        .map(t => (
                            <li
                                key={t.id}
                                className={`habit-item ${t.completed ? "done" : ""}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={t.completed}
                                    onChange={() => toggleComplete(t.id)}
                                    className='checkbox-input'
                                />

                                {editingId === t.id ? (
                                    <>
                                        <input
                                            className="edit-input"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                        />
                                        <button onClick={() => saveEdit(t.id)}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>
                                        <button onClick={() => setEditingId(null)}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span className="task-text">
                                            {t.text}
                                        </span>

                                        <button onClick={() => startEdit(t)}>
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteTask(t.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                </ul>
            </div>
            <div className='right-section'>
                <div className="calendar-wrapper"><Calendar streakDays={userStreak} />
                </div>
                <div className="streak-wrapper">
                    <div className='streak-header'>
                        <h3>Streak</h3>
                        <div className='streak-content'><FontAwesomeIcon icon={faFire} className='fa-fire' /> {totalStreak} Days </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default Habits