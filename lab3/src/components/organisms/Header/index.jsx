import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import SearchAppBar from '../../molecules/SearchAppBar';

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchClick = () => {
    setIsSearchVisible(true);
  };

  const handleCloseSearch = () => {
    setIsSearchVisible(false);
  };

  

  return (
    <div className="header">
      <div className="header-nav">
        <NavLink to="/" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")} end>Dashboard</NavLink>
        <NavLink to="/datastream" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>Data Stream</NavLink>
        <NavLink to="/analysis" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
          <span>Analysis</span>
          <span className="beta-badge">Beta</span>
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>Users</NavLink>
      </div>

      <div className="header-actions">
        {isSearchVisible ? (
          <SearchAppBar onClose={handleCloseSearch} />
        ) : (
          <>
            <IconButton onClick={handleSearchClick} sx={{ color: 'rgba(255, 255, 255, 0.8)', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
              <SearchIcon />
            </IconButton>
            <NavLink to="/help">
              <IconButton sx={{ color: 'rgba(255, 255, 255, 0.8)', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                <HelpOutlineIcon />
              </IconButton>
            </NavLink>
            <NavLink to="/settings">
              <IconButton sx={{ color: 'rgba(255, 255, 255, 0.8)', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                <SettingsIcon />
              </IconButton>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
