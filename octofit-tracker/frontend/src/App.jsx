import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const navigation = [
  { path: '/activities', label: 'Activity', icon: '↗' },
  { path: '/leaderboard', label: 'Leaderboard', icon: '✦' },
  { path: '/teams', label: 'Teams', icon: '◌' },
  { path: '/users', label: 'Athletes', icon: '◉' },
  { path: '/workouts', label: 'Workouts', icon: '▣' },
]

function Home() {
  return (
    <section className="home-view">
      <div className="home-copy">
        <p className="eyebrow">Mergington High School · Fall 2026</p>
        <h1>Small steps.<br /><em>Big energy.</em></h1>
        <p className="home-intro">A shared space for every run, rep, and breakthrough. Find your rhythm and keep your team moving.</p>
        <NavLink className="primary-action" to="/workouts">Find a workout <span>↗</span></NavLink>
      </div>
      <div className="home-stat-panel">
        <div className="stat-kicker">This week</div>
        <div className="stat-value">04<span> days</span></div>
        <p>Keep the streak alive</p>
        <div className="week-dots"><span className="done">M</span><span className="done">T</span><span className="done">W</span><span className="today">T</span><span>F</span><span>S</span><span>S</span></div>
      </div>
    </section>
  )
}

function App() {
  const location = useLocation()
  const currentPage = navigation.find((item) => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`))

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/" aria-label="OctoFit home"><img className="brand-logo" src="/octofitapp-small.png" alt="" /><span>octofit<span className="brand-dot">.</span></span></NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} key={item.path} to={item.path}><span>{item.icon}</span>{item.label}</NavLink>)}
        </nav>
        <div className="profile-chip"><span className="profile-avatar">M</span><span className="profile-name">Maya Chen</span></div>
      </header>
      <main aria-label={currentPage ? currentPage.label : 'OctoFit home'}>
        {currentPage && <div className="route-label"><span>OctoFit /</span> {currentPage.label}</div>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer><span>OCTOFIT TRACKER</span><span>Move together · 2026</span></footer>
    </div>
  )
}

export default App
