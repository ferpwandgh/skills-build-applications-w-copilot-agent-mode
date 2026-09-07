import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('teams')
      .then((items) => { setTeams(items); setStatus('ready') })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div><span className="count-pill">{teams.length} squads</span></div>
      {status === 'error' && <p className="notice notice-error" role="alert">Team data could not be loaded.</p>}
      {status === 'loading' && <p className="loading-state" role="status">Loading teams...</p>}
      <div className="team-grid">
        {teams.map((team) => (
          <article className="team-card" key={team._id || team.id || team.name}>
            <div className="team-mark">{(team.name || 'T').slice(0, 2).toUpperCase()}</div>
            <div><h2>{team.name || 'Unnamed team'}</h2><p className="muted">{team.description || 'A team built for momentum.'}</p></div>
            <div className="team-footer"><span>{team.members?.length || team.memberCount || 0} members</span><strong>{team.totalPoints || team.points || 0} pts</strong></div>
          </article>
        ))}
      </div>
      {status === 'ready' && teams.length === 0 && <p className="empty-state">No teams have been created yet.</p>}
    </section>
  )
}

export default Teams
