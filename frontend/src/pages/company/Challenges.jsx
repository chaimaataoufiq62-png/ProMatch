import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Link } from 'react-router-dom';

const CompanyChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, finished

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      // Simulation de données (à remplacer par vrai API)
      setTimeout(() => {
        setChallenges([
          {
            id: 1,
            title: 'Développeur React Senior',
            description: 'Créer une application de tableau de bord avec React et Redux',
            skills: ['React', 'Redux', 'Node.js'],
            difficulty: 'Avancé',
            createdAt: '2024-03-01',
            deadline: '2024-04-15',
            status: 'active',
            candidates: 8,
            submissions: 3,
            minScore: 70
          },
          {
            id: 2,
            title: 'Challenge Algorithmique Python',
            description: 'Résoudre des problèmes d\'algorithmes avancés en Python',
            skills: ['Python', 'Algorithmes'],
            difficulty: 'Intermédiaire',
            createdAt: '2024-02-15',
            deadline: '2024-03-30',
            status: 'active',
            candidates: 12,
            submissions: 7,
            minScore: 60
          },
          {
            id: 3,
            title: 'Développeur Frontend Junior',
            description: 'Créer des composants UI réutilisables',
            skills: ['HTML', 'CSS', 'JavaScript'],
            difficulty: 'Débutant',
            createdAt: '2024-02-01',
            deadline: '2024-03-01',
            status: 'finished',
            candidates: 15,
            submissions: 10,
            minScore: 50
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false);
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    if (filter === 'all') return true;
    return challenge.status === filter;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Actif</span>;
      case 'finished':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Terminé</span>;
      default:
        return null;
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch(difficulty) {
      case 'Débutant':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">{difficulty}</span>;
      case 'Intermédiaire':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">{difficulty}</span>;
      case 'Avancé':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">{difficulty}</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mes Challenges</h1>
        <Link
          to="/company/challenges/create"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          + Nouveau challenge
        </Link>
      </div>

      {/* Filtres */}
      <div className="mb-6 flex space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filter === 'active'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Actifs
        </button>
        <button
          onClick={() => setFilter('finished')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filter === 'finished'
              ? 'bg-gray-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Terminés
        </button>
      </div>

      {/* Liste des challenges */}
      <div className="space-y-4">
        {filteredChallenges.map((challenge) => (
          <div key={challenge.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{challenge.title}</h2>
                <p className="text-sm text-gray-500 mt-1">Créé le {challenge.createdAt}</p>
              </div>
              <div className="flex space-x-2">
                {getDifficultyBadge(challenge.difficulty)}
                {getStatusBadge(challenge.status)}
              </div>
            </div>

            <p className="text-gray-700 mb-4">{challenge.description}</p>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Compétences requises :</h3>
              <div className="flex flex-wrap gap-2">
                {challenge.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Date limite</p>
                <p className="text-sm font-medium text-gray-900">{challenge.deadline}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Candidats</p>
                <p className="text-sm font-medium text-gray-900">{challenge.candidates}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Soumissions</p>
                <p className="text-sm font-medium text-gray-900">{challenge.submissions}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Score minimum</p>
                <p className="text-sm font-medium text-gray-900">{challenge.minScore}%</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                Voir les candidats
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 font-medium">
                Modifier
              </button>
              {challenge.status === 'active' && (
                <button className="px-3 py-1 text-sm text-red-600 hover:text-red-800 font-medium">
                  Terminer
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun challenge trouvé</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CompanyChallenges;