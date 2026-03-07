import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = ({ size = 'md', showText = true }) => {
  const navigate = useNavigate();

  const sizes = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div 
      onClick={() => navigate('/')}
      className="flex items-center cursor-pointer group"
    >
      {/* Icône/Logo */}
      <div className={`${sizes[size]} w-${size === 'sm' ? '8' : size === 'md' ? '10' : '12'} bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-2 group-hover:shadow-lg transition-shadow`}>
        <span className="text-2xl">⚡</span>
      </div>
      
      {/* Texte du logo */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizes[size]} font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>
            ProMatch
          </span>
          <span className="text-xs text-gray-500 -mt-1">Recrutement intelligent</span>
        </div>
      )}
    </div>
  );
};

export default Logo;