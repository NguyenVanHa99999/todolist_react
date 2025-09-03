import React, { useState } from 'react';
import './CollapsibleSection.css';

const CollapsibleSection = ({ 
  title, 
  children, 
  defaultExpanded = true,
  className = '',
  arrowPosition = 'left' 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`collapsible-section ${className}`}>
      <button 
        className={`section-header-button ${isExpanded ? 'expanded' : 'collapsed'}`}
        onClick={toggleExpanded}
        type="button"
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Thu gọn' : 'Mở rộng'} ${title}`}
      >
        <div className="section-header-content">
          {arrowPosition === 'left' && (
            <span className={`arrow-icon ${isExpanded ? 'rotated' : ''}`}>
              ▼
            </span>
          )}
          <span className="section-title-text">{title}</span>
          {arrowPosition === 'right' && (
            <span className={`arrow-icon ${isExpanded ? 'rotated' : ''}`}>
              ▼
            </span>
          )}
        </div>
      </button>
      
      <div 
        className={`section-content ${isExpanded ? 'expanded' : 'collapsed'}`}
        style={{
          '--content-height': isExpanded ? 'auto' : '0px'
        }}
      >
        <div className="section-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
