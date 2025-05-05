import { useState } from 'react'
import { supabase } from './supabase.js'
import './CreateUser.css'

export default function CreateUser() {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleCreateUser = async (e) => {
    e.preventDefault()
    setMessage('')

    // Étape 1 : Crée l'utilisateur dans Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (error) {
      setMessage('Erreur : ' + error.message)
      return
    }

    const newUserId = data.user?.id

    // Étape 2 : Ajoute une entrée dans la table "patients"
    const { error: dbError } = await supabase
      .from('patients')
      .insert([{ id: newUserId, email, full_name: fullName }])

    if (dbError) {
      setMessage('Utilisateur créé, mais erreur en BDD : ' + dbError.message)
    } else {
      setMessage('Utilisateur créé avec succès 🎉')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className="create-container">
      <h3 className="create-title">Créer un compte patient</h3>
      <form onSubmit={handleCreateUser} className="create-form">

        <div>
          <label>Nom et prénom</label>
          <input
            type="text"
            placeholder="Nom et prénom"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          required
        />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email du patient"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="create-button">
          Créer le compte
        </button>

        {message && <p className="create-message">{message}</p>}
      </form>
    </div>
  )
}