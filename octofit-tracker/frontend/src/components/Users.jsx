import { useEffect, useState } from 'react'
import { fetchCollection, getDisplayName } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('users')
      .then((items) => {
        setUsers(items)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading">
        <div><p className="eyebrow">Community</p><h1>Athletes</h1></div>
        <span className="count-pill">{users.length} active</span>
      </div>
      {status === 'error' && <p className="notice notice-error">Athlete data could not be loaded.</p>}
      {status === 'loading' && <p className="loading-state">Loading athletes...</p>}
      <div className="data-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id || user.id || user.username}>
            <div className="avatar">{getDisplayName(user).charAt(0)}</div>
            <div><h2>{getDisplayName(user)}</h2><p className="muted">@{user.username || 'member'}</p></div>
            <div className="card-detail"><span>Focus</span><strong>{user.profile?.goal || user.goal || 'Keep moving'}</strong></div>
          </article>
        ))}
      </div>
      {status === 'ready' && users.length === 0 && <p className="empty-state">No athletes have joined yet.</p>}
    </section>
  )
}

export default Users
