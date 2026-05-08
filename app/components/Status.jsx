import React from 'react'

function Status({toDos,CheckCircle2,finished,Star,pending,Clock3}) {
  return (
    <section className="stats-grid">
          <div className="stat-card">
            <div>
              <p>Total Tasks</p>
              <h2>{toDos.length}</h2>
            </div>
            <div className="stat-icon purple">
              <CheckCircle2 size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <p>Completed</p>
              <h2>{finished.length}</h2>
            </div>
            <div className="stat-icon blue">
              <Star size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <p>Pending</p>
              <h2>{pending.length}</h2>
            </div>
            <div className="stat-icon orange">
              <Clock3 size={24} />
            </div>
          </div>
        </section>
  )
}

export default Status
