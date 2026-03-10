import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Connexion - VERSION SIMPLIFIÉE POUR TEST
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulation de connexion (sans appel API)
      console.log('Tentative de connexion avec:', email, password);
      
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Créer un utilisateur fictif basé sur l'email
      const mockUser = {
        id: 1,
        email: email,
        role: email.includes('candidate') ? 'candidate' : 'company',
        firstName: email.includes('candidate') ? 'Jean' : '',
        lastName: email.includes('candidate') ? 'Dupont' : '',
        companyName: email.includes('company') ? 'Tech Corp' : ''
      };
      
      const mockToken = 'fake-jwt-token-' + Date.now();
      
      // Sauvegarder dans localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Mettre à jour le state
      setUser(mockUser);
      
      console.log('Connexion réussie!', mockUser);
      
      // Rediriger selon le rôle
      if (mockUser.role === 'candidate') {
        navigate('/candidate');
      } else {
        navigate('/company');
      }
      
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  // Inscription
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Inscription avec:', userData);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: Date.now(),
        email: userData.email,
        role: userData.role,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        companyName: userData.companyName || ''
      };
      
      const mockToken = 'fake-jwt-token-' + Date.now();
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      navigate(userData.role === 'candidate' ? '/candidate' : '/company');
      
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      setError("Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};