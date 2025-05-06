import { useState } from 'react'
import { supabase } from './supabase.js'
import './Login.css'
export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      onLogin(data.user)
    }

    setLoading(false)
  }

  return (
    <div className="login-page">
    <div className="login-container">
      <h2 className="login-title">
        Connexion à votre espace
      </h2>

      <form onSubmit={handleLogin} className="login-form">
        <div>
          <label className="login-form label">Email</label>
          <input
            type="email"
            className="login-form input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="login-form label">Mot de passe</label>
          <input
            type="password"
            className="login-form input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="login-button"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>

        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  </div>
  )
}
