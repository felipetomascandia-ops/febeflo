import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`font-serif text-2xl font-bold tracking-widest uppercase ${className}`}>
      FEBEFLO
    </div>
  );
};

export default Logo;
