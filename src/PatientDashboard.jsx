import { useState } from 'react'
import { supabase } from './supabase.js'
import './PatientDashboard.css'

const categories = [
  { key: 'accueil', label: '🏠 Accueil' },
  { key: 'bilans', label: '🧾 Bilans' },
  { key: 'plans', label: '🍽️ Plans alimentaires' },
  { key: 'ressources', label: '📚 Ressources' },
  { key: 'comptes-rendus', label: '💬 Comptes-rendus' },
]

export default function PatientDashboard({ user, onLogout }) {
  const [selected, setSelected] = useState('accueil')

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-title">Mon espace</h2>
        <ul className="dashboard-menu">
          {categories.map((cat) => (
            <li
              key={cat.key}
              className={`dashboard-menu-item ${selected === cat.key ? 'active' : ''}`}
              onClick={() => setSelected(cat.key)}
            >
              {cat.label}
            </li>
          ))}
        </ul>
        <div className="logout-button-container">
        <button onClick={onLogout} className="logout-button">
        🚪 Se déconnecter
        </button>
        </div>
      </aside>

      <main className="dashboard-main">
        {selected === 'accueil' && (
          <div>
            <h3 className="dashboard-heading">Bienvenue {user.email}</h3>
            <p>Bienvenue dans votre espace personnel. Vous pouvez consulter ici vos documents nutritionnels.</p>
          </div>
        )}

        {selected !== 'accueil' && <DocumentList user={user} category={selected} />}
      </main>
    </div>
  )
}

// 🔁 Sous-composant pour afficher les documents d'une catégorie
function DocumentList({ user, category }) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)

  useState(() => {
    const fetch = async () => {
      const { data, error } = await supabase.storage
        .from('documents-ladietdarrate')
        .list(`${user.id}/${category}/`, { limit: 100 })

      if (error) {
        console.error('Erreur :', error.message)
        setFiles([])
      } else {
        setFiles(data)
      }
      setLoading(false)
    }
    fetch()
  }, [user.id, category])

  const getPublicUrl = (name) =>
    supabase.storage
      .from('documents-ladietdarrate')
      .getPublicUrl(`${user.id}/${category}/${name}`).data.publicUrl

  return (
    <div>
      <h3 className="dashboard-heading">{categories.find(c => c.key === category)?.label}</h3>
      {loading ? (
        <p>Chargement...</p>
      ) : files.length === 0 ? (
        <p>Aucun document dans cette catégorie.</p>
      ) : (
        <ul className="document-list">
          {files.map((file) => (
            <li key={file.name}>
              <a href={getPublicUrl(file.name)} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
