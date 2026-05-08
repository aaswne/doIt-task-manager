"use client";
import { useState ,useEffect} from "react";
import { Trash2 } from "lucide-react";
import  SideBar  from "@/app/components/SideBar";
import TopBar from "@/app/components/TopBar"
import Status from  "../components/Status"


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
  const [search,setSearch] = useState("")
  const[user,setUser]=useState([])

  const handleClick = () => {
    const newTasks = {
      id: Date.now(),
      title: title,
      description: description,
      priority: priority,
      due: date,
      status: false,
    };
    setToDos([newTasks, ...toDos]);
  };

  const finished = toDos.filter((item)=>item.status==true)
  const pending = toDos.filter((item)=>item.status==false)

  const handleDelete = (itemsTodelete) => {
    setToDos(toDos.filter((item) => item.id !== itemsTodelete));
  };

  const searchTodo =toDos.filter((item)=>
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  

  const handleChecked = (id) =>{
    setToDos(toDos.map((item)=>
      id==item.id?{...item, status:!item.status}:item
    ))

  }
console.log(Search)


useEffect(() => {
    const userData = localStorage.getItem("user");
    const parsedUser = userData ? JSON.parse(userData) : null;
    setUser(parsedUser);
  }, []);
  
  return (
    <div className="app-container">
      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen}LayoutDashboard={LayoutDashboard}CheckCircle2={CheckCircle2}Calendar={Calendar}Folder={Folder}Star={Star}/>
      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
     <TopBar Menu={Menu} Search={Search} search={search} setSearch={setSearch} setSidebarOpen={setSidebarOpen} user={user} />

        {/* Stats */}
        <Status toDos={toDos} CheckCircle2={CheckCircle2}finished={finished} Star={Star} pending={pending} Clock3={Clock3} />

        {/* Task Section */}
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
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task description"
                    rows={5}
                  ></textarea>

                  <div className="modal-row">
                    <select onChange={(e) => setPriority(e.target.value)}>
                      <option>Priority</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>

                    <input
                      onChange={(e) => setDate(e.target.value)}
                      type="date"
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
                    className={`priority-badge ${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>

                  <button className="task-more">•••</button>
                </div>

                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <div className="task-info">
                  <span>{task.category}</span>
                  <span>{task.due}</span>
                </div>

                <div className="progress-section">
                  <div className="progress-top">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="task-actions">
                  <label className="check-container">
                    <input
                    checked={task.status}
                      onChange={()=>handleChecked(task.id)}
                      type="checkbox"
                    />
                    <span className="checkmark"></span>
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
