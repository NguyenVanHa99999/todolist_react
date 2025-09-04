import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import IconPicker from '../../molecules/IconPicker';
import CollapsibleSection from '../../molecules/CollapsibleSection';
import './Sidebar.css';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const Sidebar = ({ isCollapsed, toggleSidebar, dashboards, handleCreateDashboard }) => {
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  const handleIconSelect = (icon) => {
    setIsIconPickerOpen(false);
    const newDashboardName = prompt(`Enter name for new dashboard:`);
    if (newDashboardName) {
      handleCreateDashboard(icon, newDashboardName);
    }
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && <div className="avatar">K</div>}
        {!isCollapsed && <div className="workspace-name">KDesign Workspace</div>}
      </div>
      <div className="sidebar-content">
        <CollapsibleSection title={!isCollapsed ? "FAVORITE" : ''} defaultExpanded={true}>
          <NavLink to="/" className={({ isActive }) => "sidebar-item" + (isActive ? " active" : "")} end>
            <span className="emoji">👋</span>
            {!isCollapsed && <span>My Task</span>}
          </NavLink>
          <NavLink to="/goals" className={({ isActive }) => "sidebar-item" + (isActive ? " active" : "")}>
            <span className="emoji">🎯</span>
            {!isCollapsed && <span>Ultimate Goals</span>}
          </NavLink>
        </CollapsibleSection>

        <CollapsibleSection title={!isCollapsed ? "MY DASHBOARD" : ''} defaultExpanded={true}>
          {dashboards.map(dashboard => (
            <NavLink to={`/dashboard/${dashboard.id}`} className={({ isActive }) => "sidebar-item" + (isActive ? " active" : "")} key={dashboard.id}>
              <span className="emoji">{dashboard.emoji}</span>
              {!isCollapsed && <span>{dashboard.name}</span>}
            </NavLink>
          ))}
        </CollapsibleSection>

        <div className="sidebar-section">
          <div className="new-dashboard" onClick={() => !isCollapsed && setIsIconPickerOpen(true)}>
            <span className="add-icon">+</span>
            {!isCollapsed && <span>New dashboard</span>}
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        {!isCollapsed && (
          <>
            <div className="footer-item">
              <span className="icon">⚙️</span>
              <span>Config Layout</span>
            </div>
            <div className="footer-item">
              <span className="icon">📁</span>
              <span>All Dashboards</span>
            </div>
          </>
        )}
        <div className="footer-item toggle-item">
          <IconButton onClick={toggleSidebar} sx={{ color: '#82869E' }}>
            {isCollapsed ? <KeyboardDoubleArrowRightIcon /> : <KeyboardDoubleArrowLeftIcon />}
          </IconButton>
        </div>
      </div>

      {isIconPickerOpen && (
        <IconPicker
          onSelect={handleIconSelect}
          onClose={() => setIsIconPickerOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
