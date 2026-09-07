import { useEffect, useState } from 'react'
import { fetchCollection, getDisplayName } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('activities')
      .then((items) => { setActivities(items); setStatus('ready') })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Movement log</p><h1>Recent activity</h1></div><span className="count-pill">{activities.length} sessions</span></div>
      {status === 'error' && <p className="notice notice-error">Activity data could not be loaded.</p>}
      {status === 'loading' && <p className="loading-state">Loading activity...</p>}
      <div className="table-shell">
        <div className="activity-row activity-header"><span>Activity</span><span>Athlete</span><span>Duration</span><span>Points</span></div>
        {activities.map((activity, index) => (
          <div className="activity-row" key={activity._id || activity.id || index}>
            <span className="activity-name"><span className="activity-dot" />{activity.type || activity.name || 'Workout'}</span>
            <span className="muted">{getDisplayName(activity.user || activity)}</span>
            <span>{activity.durationMinutes || activity.duration || 0} min</span>
            <strong className="points">+{activity.points || 0}</strong>
          </div>
        ))}
      </div>
      {status === 'ready' && activities.length === 0 && <p className="empty-state">No activities recorded yet.</p>}
    </section>
  )
}

export default Activities
