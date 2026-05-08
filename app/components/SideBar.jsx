import React from 'react'

function SideBar({sidebarOpen,LayoutDashboard,CheckCircle2,Calendar,Folder,Star}) {
  return (
         <aside className={`sidebar ${sidebarOpen ? "show-sidebar" : ""}`}>
        <div className="logo-section">
          <div className="logo-box">D</div>
          <div>
            <h2>Do It</h2>
            <p>Stay Focused</p>
          </div>
        </div>

        <nav className="sidebar-menu">
          <button className="menu-item active">
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button className="menu-item">
            <CheckCircle2 size={18} />
            Tasks
          </button>

          <button className="menu-item">
            <Calendar size={18} />
            Schedule
          </button>

          <button className="menu-item">
            <Folder size={18} />
            Projects
          </button>

          <button className="menu-item">
            <Star size={18} />
            Favorites
          </button>
        </nav>

        <div className="premium-card">
          <h3>Upgrade Pro</h3>
          <p>Unlock advanced analytics and unlimited projects.</p>
          <button>Upgrade</button>
        </div>
      </aside>
  )
}

export default SideBar
