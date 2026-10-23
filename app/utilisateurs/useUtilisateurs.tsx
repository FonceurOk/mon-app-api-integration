import { useState, useEffect } from 'react';
import { goRestApi } from '../gorest';

interface GoRestUser {
  id: number;
  name: string;
  email: string;
  gender: 'male' | 'female';
  status: 'active' | 'inactive';
}

export function useUtilisateurs() {
  const [utilisateurs, setUtilisateurs] = useState<GoRestUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ success: boolean; text: string } | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const chargerUtilisateurs = async () => {
    try {
      setLoading(true);
      const data = await goRestApi.getUsers();
      setUtilisateurs(data);
      setError(null);
    } catch (err) {
      setError("Impossible de récupérer les utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chargerUtilisateurs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionMessage(null);

    try {
      await goRestApi.createUser({ name, email, gender });
      setActionMessage({ success: true, text: "Utilisateur ajouté avec succès !" });

      setName('');
      setEmail('');
      setGender('');

      chargerUtilisateurs();
    } catch (err: any) {
      try {
        const errorData = JSON.parse(err.message);
        const messages = errorData.map((e: any) => `${e.field} ${e.message}`).join(', ');
        setActionMessage({ success: false, text: messages });
      } catch {
        setActionMessage({ success: false, text: "Erreur lors de la création." });
      }
    }
  };

  return {
    utilisateurs,
    loading,
    error,
    actionMessage,
    form: {
      name,
      setName,
      email,
      setEmail,
      gender,
      setGender,
      handleSubmit
    }
  };
}
