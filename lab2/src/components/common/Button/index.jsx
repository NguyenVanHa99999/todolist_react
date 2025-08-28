import React from 'react';
import './Button.css';
import { useButtonAnimations } from '../../../hooks/useGSAPAnimations';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  IconComponent = null,
  className = ''
}) => {
  const buttonRef = useButtonAnimations();

  return (
    <button
      ref={buttonRef}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
    >
      {IconComponent && <IconComponent className="btn-icon" />}
      {children}
    </button>
  );
};

export default Button;
