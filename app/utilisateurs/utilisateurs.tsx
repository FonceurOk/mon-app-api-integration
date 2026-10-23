import { useUtilisateurs } from "../utilisateurs/useUtilisateurs";

export function Utilisateurs() {
  const { utilisateurs, loading, error, actionMessage, form } = useUtilisateurs();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
        Gestion des Utilisateurs GoRest
      </h1>

      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginBottom: '30px', backgroundColor: '#fff' }}>
        <h3 style={{ marginTop: 0 }}>Ajouter un profil</h3>
        
        {actionMessage && (
          <p style={{ color: actionMessage.success ? 'green' : 'red', fontWeight: 'bold' }}>
            {actionMessage.success ? '✅ ' : '⚠️ '} {actionMessage.text}
          </p>
        )}

        <form onSubmit={form.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input 
            type="text" 
            placeholder="Nom complet" 
            value={form.name} 
            onChange={(e) => form.setName(e.target.value)} 
            required 
            style={inputStyle} 
          />
          <input 
            type="email" 
            placeholder="Adresse e-mail" 
            value={form.email} 
            onChange={(e) => form.setEmail(e.target.value)} 
            required 
            style={inputStyle} 
          />
          <select value={form.gender} onChange={(e) => form.setGender(e.target.value)} required style={inputStyle}>
            <option value="">-- Choisir un genre --</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>

          <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Sauvegarder sur l'API
          </button>
        </form>
      </div>

      <h2>Profils enregistrés</h2>
      
      {loading && <p>Chargement des données en cours...</p>}
      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}
      
      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {utilisateurs.length > 0 ? (
            utilisateurs.map((user) => (
              <div key={user.id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '6px', backgroundColor: '#f9f9f9' }}>
                <strong>{user.name}</strong>
                <p style={{ margin: '5px 0 10px 0', color: '#666', fontSize: '14px' }}>✉️ {user.email}</p>
                <span style={{ 
                  fontSize: '12px', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold',
                  backgroundColor: user.gender === 'male' ? '#e3f2fd' : '#fce4ec', 
                  color: user.gender === 'male' ? '#0d47a1' : '#880e4f' 
                }}>
                  {user.gender === 'male' ? 'Homme' : 'Femme'}
                </span>
              </div>
            ))
          ) : (
            <p>Aucun utilisateur trouvé.</p>
          )}
        </div>
      )}
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' };
