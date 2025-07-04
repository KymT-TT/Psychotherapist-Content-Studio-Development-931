import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick, 
  ...props 
}) => {
  const cardClasses = `
    bg-white rounded-2xl shadow-soft border border-gray-100 
    ${hover ? 'hover:shadow-medium transition-shadow duration-200 cursor-pointer' : ''}
    ${className}
  `;

  const CardComponent = hover ? motion.div : 'div';

  return (
    <CardComponent
      className={cardClasses}
      onClick={onClick}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

export default Card;