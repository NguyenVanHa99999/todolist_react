import React, { useState } from 'react';
import './Button.css';
import DoraemonHelper from '../DoraemonHelper';
import { useButtonAnimations } from '../../../hooks/useGSAPAnimations';

const ButtonWithDoraemon = ({
  children,
  onClick,
  variant = 'primary',
  IconComponent = null,
  className = '',
  showDoraemon = false,
  doraemonMessage = "Hãy bấm vào tôi để tạo task!"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useButtonAnimations();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="btn-with-doraemon">
      <button
        ref={buttonRef}
        className={`btn btn-${variant} ${className}`}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {IconComponent && <IconComponent className="btn-icon" />}
        {children}
      </button>
      
      {showDoraemon && (
        <DoraemonHelper 
          show={isHovered} 
          message={doraemonMessage}
        />
      )}
    </div>
  );
};

export default ButtonWithDoraemon;
