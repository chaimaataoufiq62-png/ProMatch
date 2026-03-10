import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Link } from 'react-router-dom';

const CompanyCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      // Simulation de données (à remplacer par vrai API)
      setTimeout(() => {
        setCandidates([
          {
            id: 1,
            name: 'Jean Dupont',
            email: 'jean.dupont@email.com',
            skills: ['React', 'Node.js', 'MongoDB'],
            experience: '3 ans',
            location: 'Paris',
            score: 85,
            status: 'matched',
            challenges: 5
          },
          {
            id: 2,
            name: 'Marie Martin',
            email: 'marie.martin@email.com',
            skills: ['Python', 'Django', 'PostgreSQL'],
            experience: '5 ans',
            location: 'Lyon',
            score: 92,
            status: 'contacted',
            challenges: 8
          },
          {
            id: 3,
            name: 'Pierre Durand',
            email: 'pierre.durand@email.com',
            skills: ['Java', 'Spring Boot', 'Angular'],
            experience: '2 ans',
            location: 'Bordeaux',
            score: 78,
            status: 'matched',
            challenges: 3
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'matched':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Matché</span>;
      case 'contacted':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Contacté</span>;
      case 'interviewed':
        return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Entretien</span>;
      default:
        return null;
    }
  };

  // Extraire toutes les compétences uniques pour le filtre
  const allSkills = [...new Set(candidates.flatMap(c => c.skills))];

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === 'all' || candidate.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Candidats</h1>

      {/* Filtres et recherche */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher un candidat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Toutes les compétences</option>
            {allSkills.map((skill, index) => (
              <option key={index} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des candidats */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <div key={candidate.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-gray-900">{candidate.name}</h2>
                  {getStatusBadge(candidate.status)}
                </div>
                
                <p className="text-sm text-gray-600 mb-1">{candidate.email}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {candidate.location} • {candidate.experience} d'expérience
                </p>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>📊 Score: <span className="font-semibold text-blue-600">{candidate.score}%</span></span>
                  <span>📝 Challenges: {candidate.challenges}</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col space-y-2">
                <Link
                  to={`/company/candidates/${candidate.id}`}
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 text-center"
                >
                  Voir le profil
                </Link>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Contacter
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun candidat trouvé</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CompanyCandidates;