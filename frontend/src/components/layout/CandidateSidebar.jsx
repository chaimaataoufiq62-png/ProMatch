import React from 'react';
import { NavLink } from 'react-router-dom';

const CandidateSidebar = () => {
  const menuItems = [
    { path: '/candidate', name: 'Tableau de bord', icon: '📊' },
    { path: '/candidate/profile', name: 'Mon profil', icon: '👤' },
    { path: '/candidate/challenges', name: 'Challenges', icon: '📝' },
    { path: '/candidate/submissions', name: 'Mes soumissions', icon: '📤' },
  ];

  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="mt-5 px-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md mb-1 ${
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default CandidateSidebar;