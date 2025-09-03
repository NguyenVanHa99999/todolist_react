import React from 'react';
import MuiCard from '@mui/material/Card';

/**
 * Custom Card Atom
 * This component wraps the Material-UI Card to provide a consistent base for card elements.
 */
const Card = ({ children, sx, ...props }) => {
  // Base styles for all cards, can be overridden by the sx prop
  const baseStyles = {
    borderRadius: '16px', // A common default radius
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', // A subtle default shadow
    border: '1px solid #F3F4F6',
    backgroundColor: '#fff',
  };

  return (
    <MuiCard sx={{ ...baseStyles, ...sx }} {...props}>
      {children}
    </MuiCard>
  );
};

export default Card;

