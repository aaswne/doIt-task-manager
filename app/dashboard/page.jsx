"use client";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import SideBar from "@/app/components/SideBar";
import TopBar from "@/app/components/TopBar";
import Status from "../components/Status";

import {
  Search,
  Plus,
  Calendar,
  Clock3,
  Folder,
  Star,
  LayoutDashboard,
  CheckCircle2,
  Menu,
} from "lucide-react";

export default function DashBoard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedTodo");
    if (saved) {
      setToDos(JSON.parse(saved));
    }
  }, []);

  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("savedTodo", JSON.stringify(toDos));
  }, [toDos]);

  const handleClick = () => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      due: date,
      status: false,
    };

    setToDos([newTask, ...toDos]);

    // clear inputs
    setTitle("");
    setDescription("");
    setPriority("");
    setDate("");
  };

  const finished = toDos.filter((item) => item.status === true);
  const pending = toDos.filter((item) => item.status === false);

  const handleDelete = (id) => {
    setToDos(toDos.filter((item) => item.id !== id));
  };

  const handleChecked = (id) => {
    setToDos(
      toDos.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item,
      ),
    );
  };

  const searchTodo = toDos.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const userData = localStorage.getItem("user");
    setUser(userData ? JSON.parse(userData) : null);
  }, []);

  return (
    <div className="app-container">
      <SideBar
        sidebarOpen={sidebarOpen}
        LayoutDashboard={LayoutDashboard}
        CheckCircle2={CheckCircle2}
        Calendar={Calendar}
        Folder={Folder}
        Star={Star}
      />

      <main className="main-content">
        <TopBar
          Menu={Menu}
          Search={Search}
          search={search}
          setSearch={setSearch}
          setSidebarOpen={setSidebarOpen}
          user={user}
        />

        <Status
          toDos={toDos}
          finished={finished}
          pending={pending}
          CheckCircle2={CheckCircle2}
          Star={Star}
          Clock3={Clock3}
        />

        <section className="task-section">
          <div className="section-header">
            <div>
              <h2>Today's Tasks</h2>
              <p>Your ongoing productivity workflow</p>
            </div>

            <button className="add-task-btn" onClick={() => setShowModal(true)}>
              <Plus size={18} />
              Add Task
            </button>
          </div>

          {showModal && (
            <div className="modal-overlay">
              <div className="todo-modal">
                <div className="modal-header">
                  <div>
                    <h2>Create Task</h2>
                    <p>Add your next productivity task</p>
                  </div>

                  <button
                    className="close-modal"
                    onClick={() => setShowModal(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="todo-input-box">
                  <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <textarea
                    placeholder="Task description"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <div className="modal-row">
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="">Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>

                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <button onClick={handleClick} className="create-btn">
                    <Plus size={18} />
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="task-grid">
            {searchTodo.map((task) => (
              <div className="task-card" key={task.id}>
                <div className="task-top">
                  <span
                    className={`priority-badge ${task.priority?.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>

                  <button className="task-more">•••</button>
                </div>

                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <div className="task-info">
                  <span>{task.due}</span>
                </div>

                <div className="task-actions">
                  <label className="check-container">
                    <input
                      type="checkbox"
                      checked={task.status}
                      onChange={() => handleChecked(task.id)}
                    />
                  </label>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="delete-btn"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
