import { useState, useEffect } from 'react'
import { supabase } from './supabase.js'
import './UploadDoc.css'

export default function UploadDoc() {
  const [patients, setPatients] = useState([])
  const [selectedPatientId, setSelectedPatientId] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('id, email, full_name')
        .order('email', { ascending: true })

      if (error) {
        console.error('Erreur de récupération des patients sur Supabase :', error)
      } else {
        setPatients(data)
      }
    }

    fetchPatients()
  }, [])

  const handleUpload = async (e) => {
    e.preventDefault()
    setMessage('')

    if (!file || !selectedPatientId || !selectedCategory) {
      setMessage('Veuillez choisir un patient, une catégorie et un fichier.')
      return
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${selectedPatientId}/${selectedCategory}/${fileName}`

    const { error } = await supabase.storage
      .from('documents-ladietdarrate')
      .upload(filePath, file)

    if (error) {
      setMessage('Erreur : ' + error.message)
    } else {
      setMessage('Fichier envoyé avec succès 🎉')
      setFile(null)
      setSelectedCategory('')
    }
  }

  return (
    <div className="upload-container">
      <h3 className="upload-title">Uploader un document pour un patient</h3>

      <form onSubmit={handleUpload} className="upload-form">
        <label>Choisir un patient :</label>
        <select
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
        >
          <option value="">-- Sélectionner --</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.full_name} - {patient.email}
            </option>
          ))}
        </select>

        <label>Choisir une catégorie :</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Catégorie --</option>
          <option value="bilans">🧾 Bilan nutritionnel</option>
          <option value="plans">🍽️ Plans alimentaires</option>
          <option value="ressources">📚 Ressources</option>
          <option value="comptes-rendus">💬 Comptes-rendus</option>
        </select>

        <label>Fichier :</label>
        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && <p className="upload-selected-file">Fichier sélectionné : {file.name}</p>}

        <button type="submit" className="upload-button">
          Envoyer
        </button>

        {message && <p className="upload-message">{message}</p>}
      </form>
    </div>
  )
}