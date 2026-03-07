import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import api from '../../services/api';

const CandidateChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

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
            title: 'Développeur React',
            company: 'TechCorp',
            description: 'Créer une application de gestion de tâches',
            skills: ['React', 'Node.js', 'MongoDB'],
            difficulty: 'Intermédiaire',
            deadline: '2024-04-15',
            reward: 500
          },
          {
            id: 2,
            title: 'Challenge Algorithmique',
            company: 'DataSoft',
            description: 'Résoudre des problèmes d\'algorithmes',
            skills: ['Python', 'Algorithmes'],
            difficulty: 'Débutant',
            deadline: '2024-04-10',
            reward: 200
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false);
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Challenges disponibles</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{challenge.title}</h2>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {challenge.difficulty}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{challenge.company}</p>
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
              
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>⏰ {challenge.deadline}</span>
                <span className="font-semibold text-green-600">{challenge.reward} points</span>
              </div>
              
              <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Participer
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default CandidateChallenges;