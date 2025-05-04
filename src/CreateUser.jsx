// src/components/CreateUser.jsx
import { useState } from 'react'
import { supabase } from './supabase.js'
import './CreateUser.css'

export default function CreateUser() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleCreateUser = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })
    if (error) {
      setMessage('Erreur : ' + error.message)
    } else {
      setMessage('Utilisateur créé avec succès 🎉')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <form onSubmit={handleCreateUser} className="create-form">
      <h3 className="create-title">Créer un compte patient</h3>
      <input
        type="email"
        placeholder="Email du patient"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="create-button">Créer le compte</button>
      {message && <p className="create-message">{message}</p>}
    </form>
  )
}