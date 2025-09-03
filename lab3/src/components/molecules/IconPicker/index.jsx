import React from 'react';
import './IconPicker.css';

const icons = [
  '🚀', '🎨', '📊', '💰', '👥', '📅', '💡', '🐞', '👋', '🎯',
  '✅', '🎓', '🎵', '💻', '🛒', '✈️', '⚽️', '🏠', '🌍', '📚',
  '💡', '📈', '📌', '📎', '📞', '🔔', '⚙️', '🛠️', '🔑', '🔒',
  '❤️', '⭐', '🎉', '🎁', '🏆', '🥇', '📈', '📉', '💼', '📁',
  '📂', '📄', '📆', '✏️', '🗑️', '🔍', '🔬', '🔭', '💡', '⚡️'
];

const IconPicker = ({ onSelect, onClose }) => {
  return (
    <div className="icon-picker-overlay" onClick={onClose}>
      <div className="icon-picker-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Choose an Icon</h3>
        <div className="icon-grid">
          {icons.map((icon, index) => (
            <button key={index} className="icon-button" onClick={() => onSelect(icon)}>
              {icon}
            </button>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default IconPicker;
