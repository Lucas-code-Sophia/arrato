import { useEffect, useState } from 'react'
import { supabase } from './supabase.js'
import CreateUser from './CreateUser'
import Login from './Login'
import UploadDoc from './UploadDoc'
import PatientDocuments from './PatientsDocuments'
import Layout from './Layout'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => listener?.subscription.unsubscribe()
  }, [])

  const isAdmin = user?.email === 'ladietdarrate@gmail.com'

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <Layout>
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm">Connecté : {user.email}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded text-sm"
            >
              Se déconnecter
            </button>
          </div>

          {isAdmin ? (
            <>
              <h2 className="text-xl font-bold mb-4">Bienvenue admin</h2>
              <CreateUser />
              <UploadDoc />
            </>
          ) : (
            <>
              <p className="mb-2 font-medium">Bienvenue patient {user.email}</p>
              <PatientDocuments user={user} />
            </>
          )}
        </>
      )}
    </Layout>
  )
}

export default App