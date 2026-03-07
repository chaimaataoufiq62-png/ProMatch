import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';

const CandidateSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, evaluated

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      // Simulation de données (à remplacer par vrai API)
      setTimeout(() => {
        setSubmissions([
          {
            id: 1,
            challengeTitle: 'Développeur React - Application de tâches',
            company: 'TechCorp',
            submittedAt: '2024-03-10T14:30:00',
            status: 'evaluated',
            score: 85,
            feedback: 'Bon travail, code propre et bien structuré. Quelques améliorations possibles sur la gestion d\'état.',
            solution: 'https://github.com/candidat/projet-react'
          },
          {
            id: 2,
            challengeTitle: 'Challenge Algorithmique Python',
            company: 'DataSoft',
            submittedAt: '2024-03-08T09:15:00',
            status: 'evaluated',
            score: 92,
            feedback: 'Excellent ! Solutions optimales et bien commentées.',
            solution: 'https://github.com/candidat/algo-python'
          },
          {
            id: 3,
            challengeTitle: 'Application Mobile React Native',
            company: 'MobileLabs',
            submittedAt: '2024-03-12T11:45:00',
            status: 'pending',
            score: null,
            feedback: null,
            solution: 'https://github.com/candidat/mobile-app'
          },
          {
            id: 4,
            challengeTitle: 'API REST avec Node.js',
            company: 'BackendSolutions',
            submittedAt: '2024-03-09T16:20:00',
            status: 'pending',
            score: null,
            feedback: null,
            solution: 'https://github.com/candidat/node-api'
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Erreur lors du chargement des soumissions:', error);
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'all') return true;
    return sub.status === filter;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'evaluated':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Évalué</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">En attente</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mes soumissions</h1>

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
            Toutes
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            En attente
          </button>
          <button
            onClick={() => setFilter('evaluated')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'evaluated'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Évaluées
          </button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500">Total soumissions</p>
            <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500">En attente</p>
            <p className="text-2xl font-bold text-yellow-600">
              {submissions.filter(s => s.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500">Score moyen</p>
            <p className="text-2xl font-bold text-green-600">
              {Math.round(
                submissions
                  .filter(s => s.status === 'evaluated')
                  .reduce((acc, s) => acc + s.score, 0) / 
                submissions.filter(s => s.status === 'evaluated').length
              ) || 0}%
            </p>
          </div>
        </div>

        {/* Liste des soumissions */}
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <div key={submission.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{submission.challengeTitle}</h2>
                  <p className="text-sm text-gray-600">{submission.company}</p>
                </div>
                {getStatusBadge(submission.status)}
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  Soumis le {formatDate(submission.submittedAt)}
                </p>
              </div>

              {submission.status === 'evaluated' && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Résultat de l'évaluation</h3>
                    <span className="text-2xl font-bold text-blue-600">{submission.score}%</span>
                  </div>
                  <p className="text-gray-700 text-sm">{submission.feedback}</p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <a
                  href={submission.solution}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  Voir la solution
                </a>

                {submission.status === 'pending' && (
                  <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                    Modifier
                  </button>
                )}

                {submission.status === 'evaluated' && (
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Voir les détails
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune soumission</h3>
              <p className="mt-1 text-sm text-gray-500">
                Vous n'avez pas encore soumis de challenge.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => window.location.href = '/candidate/challenges'}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Voir les challenges disponibles
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Graphique de progression (optionnel) */}
        {submissions.filter(s => s.status === 'evaluated').length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Évolution de vos scores</h3>
            <div className="h-64 flex items-end space-x-2">
              {submissions
                .filter(s => s.status === 'evaluated')
                .sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt))
                .map((sub, index) => (
                  <div key={sub.id} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${sub.score}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">#{index + 1}</span>
                    <span className="text-xs font-medium text-gray-700">{sub.score}%</span>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CandidateSubmissions;