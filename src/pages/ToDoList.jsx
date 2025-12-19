import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import '../css/ToDoList.css'
import Timer from '../components/Timer';
import { useState, useEffect } from "react";
import todosData from "../assets/data/todos.json";


function ToDoList() {

    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        setTasks(todosData);
    }, []);

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [filter, setFilter] = useState("all"); // all | completed | pending

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
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
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
            {/* LEFT SECTION */}
            <div className="left-section">
                <div className="input-group">
                    <input className='todo-input' placeholder="Add a New Task" value={task}
                        onChange={(e) => setTask(e.target.value)} />
                    <span>
                        <button onClick={addTask} className='add-button'>
                            <FontAwesomeIcon icon={faPlus} /> Add Task
                        </button>
                    </span>
                </div>
                {/* Show message if no tasks */}
                {tasks.length === 0 && (
                    <>
                        <div className='todo-main'>
                            <p>No tasks yet</p>
                            <p>Add your first task to get started!</p>
                        </div>
                    </>
                )}

                {/* Task List */}
                <ul className="todo-list">
                    <h3 className="task-heading">
                        {filter === "all" && "All Tasks"}
                        {filter === "completed" && "Completed Tasks"}
                        {filter === "pending" && "Pending Tasks"}
                    </h3>

                    <p className="task-subtext">
                        {filter === "completed" && "Great job finishing these!"}
                        {filter === "pending" && "Focus on completing these next."}
                    </p>

                    {tasks
                        .filter(t => {
                            if (filter === "completed") return t.completed;
                            if (filter === "pending") return !t.completed;
                            return true; // all
                        })
                        .map(t => (
                            <li
                                key={t.id}
                                className={`todo-item ${t.completed ? "done" : ""}`}
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

            {/* RIGHT SECTION */}
            <div className="right-section">
                <div className="box"><Timer /></div>
                <div className="box progress-box">
                    <h4>Progress Report</h4>

                    <div className={`progress-item ${filter === "all" ? "active" : ""}`}
                        onClick={() => setFilter("all")}>
                        <span>Total Tasks</span>
                        <span>{tasks.length}</span>
                    </div>

                    <div className={`progress-item ${filter === "completed" ? "active" : ""}`}
                        onClick={() => setFilter("completed")}>
                        <span>Completed</span>
                        <span>{tasks.filter(t => t.completed).length}</span>
                    </div>

                    <div className={`progress-item ${filter === "pending" ? "active" : ""}`}
                        onClick={() => setFilter("pending")}>
                        <span>Pending</span>
                        <span>{tasks.filter(t => !t.completed).length}</span>
                    </div>
                </div>

                <div className="box">
                    <h4>Notes</h4>
                    <div
                        contentEditable="true"
                        className="editable-note"
                        data-placeholder="Write your notes here..."
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default ToDoList;
