import React from 'react';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/AuthContext';

const CandidateDashboard = () => {
  const { user } = useAuth();

  // Statistiques simulées
  const stats = [
    { label: 'Challenges complétés', value: '8', icon: '📊', color: 'bg-blue-500' },
    { label: 'Score moyen', value: '85%', icon: '⭐', color: 'bg-green-500' },
    { label: 'En attente', value: '3', icon: '⏳', color: 'bg-yellow-500' },
    { label: 'Classement', value: '#12', icon: '🏆', color: 'bg-purple-500' }
  ];

  const recentChallenges = [
    { id: 1, title: 'Développeur React', company: 'TechCorp', status: 'En cours', score: null },
    { id: 2, title: 'Challenge Algorithmique', company: 'DataSoft', status: 'Évalué', score: 92 },
    { id: 3, title: 'Application Mobile', company: 'MobileLabs', status: 'En attente', score: null }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* En-tête de bienvenue */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Bonjour, {user?.firstName} ! 👋
          </h1>
          <p className="text-blue-100">
            Bienvenue sur votre espace personnel ProMatch. Prêt pour de nouveaux challenges ?
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <span className={`text-xs font-semibold text-white px-2 py-1 rounded-full ${stat.color}`}>
                  {stat.label}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Challenges récents */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Challenges récents</h2>
          <div className="space-y-3">
            {recentChallenges.map((challenge) => (
              <div key={challenge.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{challenge.title}</h3>
                  <p className="text-sm text-gray-500">{challenge.company}</p>
                </div>
                <div className="flex items-center space-x-4">
                  {challenge.score && (
                    <span className="text-sm font-semibold text-green-600">{challenge.score}%</span>
                  )}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    challenge.status === 'Évalué' ? 'bg-green-100 text-green-800' :
                    challenge.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {challenge.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CandidateDashboard;