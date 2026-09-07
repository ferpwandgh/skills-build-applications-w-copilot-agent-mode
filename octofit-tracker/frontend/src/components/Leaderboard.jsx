import { useEffect, useState } from 'react'
import { fetchCollection, getDisplayName } from '../api'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('leaderboard')
      .then((items) => { setLeaders(items); setStatus('ready') })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1></div><span className="season-label">September 2026</span></div>
      {status === 'error' && <p className="notice notice-error" role="alert">Leaderboard data could not be loaded.</p>}
      {status === 'loading' && <p className="loading-state" role="status">Loading rankings...</p>}
      <div className="ranking-list">
        {leaders.map((leader, index) => (
          <article className={`ranking-item ${index === 0 ? 'ranking-item-top' : ''}`} key={leader._id || leader.id || leader.userId || index}>
            <span className="rank-number">{leader.rank || index + 1}</span>
            <div className="rank-avatar">{getDisplayName(leader.user || leader).charAt(0)}</div>
            <div className="rank-info"><h2>{getDisplayName(leader.user || leader)}</h2><p className="muted">{leader.team?.name || leader.teamName || 'Independent'}</p></div>
            <strong className="rank-points">{leader.points || 0}<small> pts</small></strong>
          </article>
        ))}
      </div>
      {status === 'ready' && leaders.length === 0 && <p className="empty-state">The leaderboard is waiting for its first workout.</p>}
    </section>
  )
}

export default Leaderboard
