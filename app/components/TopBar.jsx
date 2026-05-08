import React from 'react'

function TopBar({Menu,Search,search,setSearch,setSidebarOpen,sidebarOpen,user}) {
  return (
       <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={22} />
            </button>

            <div>
              <h1>Hello, {user.name} 👋</h1>
            </div>
          </div>

          <div className="topbar-right">
            <div className="search-box">
              <Search size={18} />
              <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text" placeholder="Search tasks..." />
            </div>
          </div>
        </header>
  )
}

export default TopBar
