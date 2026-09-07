import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('workouts')
      .then((items) => { setWorkouts(items); setStatus('ready') })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Built for your goals</p><h1>Workouts</h1></div><span className="count-pill">{workouts.length} plans</span></div>
      {status === 'error' && <p className="notice notice-error">Workout data could not be loaded.</p>}
      {status === 'loading' && <p className="loading-state">Loading workouts...</p>}
      <div className="workout-grid">
        {workouts.map((workout) => (
          <article className="workout-card" key={workout._id || workout.id || workout.title}>
            <div className="workout-type">{workout.type || 'Training'}</div>
            <h2>{workout.title || workout.name || 'Workout plan'}</h2>
            <p>{workout.description || 'A focused session to help you make progress.'}</p>
            <div className="workout-meta"><span>{workout.durationMinutes || workout.duration || 30} min</span><span>{workout.difficulty || 'All levels'}</span></div>
          </article>
        ))}
      </div>
      {status === 'ready' && workouts.length === 0 && <p className="empty-state">No workout plans are available yet.</p>}
    </section>
  )
}

export default Workouts
