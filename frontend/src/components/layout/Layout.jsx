import React from 'react';
import Header from './Header';
import CandidateSidebar from './CandidateSidebar';
import CompanySidebar from './CompanySidebar';
import { useAuth } from '../../context/AuthContext';

const Layout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        {/* Sidebar selon le rôle */}
        {user?.role === 'candidate' ? <CandidateSidebar /> : <CompanySidebar />}
        
        {/* Contenu principal */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;