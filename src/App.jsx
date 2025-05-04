import CreateUser from './CreateUser'
// plus tard on ajoutera UploadDoc, etc.

function App() {
  const [user, setUser] = useState(null)

  // identifie si c'est un admin par son email (exemple temporaire)
  const isAdmin = user?.email === 'ton.email@admin.com'

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={setUser} />
      ) : isAdmin ? (
        <>
          <h2>Bienvenue admin</h2>
          <CreateUser />
        </>
      ) : (
        <p>Bienvenue patient {user.email}</p>
      )}
    </div>
  )
}