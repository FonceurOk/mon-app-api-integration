const BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN = import.meta.env.VITE_GOREST_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${TOKEN}`
};

export const goRestApi = {
  getUsers: async () => {
    const response = await fetch(`${BASE_URL}/users`, { headers });
    if (!response.ok) throw new Error('Erreur lors de la récupération des utilisateurs');
    return response.json();
  },

  createUser: async (userData) => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...userData,
        status: 'active'
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
    return response.json();
  }
};
