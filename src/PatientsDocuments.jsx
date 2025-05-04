import { useEffect, useState } from 'react'
import { supabase } from './supabase.js'
import './PatientsDocuments.css'

export default function PatientDocuments({ user }) {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true)
      const { data, error } = await supabase.storage
        .from('documents')
        .list(user.id + '/', { limit: 100 })

      if (error) {
        console.error('Erreur lors du listing :', error.message)
      } else {
        setDocuments(data)
      }
      setLoading(false)
    }

    fetchDocuments()
  }, [user])

  const getPublicUrl = (fileName) => {
    return supabase.storage
      .from('documents')
      .getPublicUrl(`${user.id}/${fileName}`).data.publicUrl
  }

  return (
    <div className="patient-documents">
      <h3 className="patient-documents-title">Mes documents</h3>

      {loading ? (
        <p className="document-loading">Chargement...</p>
      ) : documents.length === 0 ? (
        <p className="document-empty">Aucun document disponible.</p>
      ) : (
        <ul className="document-list">
          {documents.map((doc) => (
            <li key={doc.name} className="document-item">
              <a
                href={getPublicUrl(doc.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="document-link"
              >
                {doc.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}