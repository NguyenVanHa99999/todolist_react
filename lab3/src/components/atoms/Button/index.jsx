import React from 'react';
import MuiButton from '@mui/material/Button';

/**
 * Custom Button Atom
 * This component wraps the Material-UI Button to provide consistent styling and a centralized API for buttons across the application.
 * It can be extended with different variants and styles as needed.
 */
const Button = ({ children, sx, ...props }) => {
  // Base styles for all buttons in the application
  const baseStyles = {
    borderRadius: '8px', // Consistent border radius
    textTransform: 'none', // Avoid ALL CAPS buttons
    fontWeight: 600,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    }
  };

  return (
    <MuiButton sx={{ ...baseStyles, ...sx }} {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;

