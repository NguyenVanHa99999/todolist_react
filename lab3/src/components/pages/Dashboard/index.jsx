import React, { useState } from 'react';
import Sidebar from '../../organisms/Sidebar';
import Header from '../../organisms/Header';
import { Routes, Route } from 'react-router-dom';
import MainContent from '../../templates/MainContent';
import GoalsPage from '../GoalsPage';
import DashboardDetailPage from '../DashboardDetailPage';
import DataStreamPage from '../DataStreamPage';
import AnalysisPage from '../AnalysisPage';
import UsersPage from '../UsersPage';
import SettingsPage from '../SettingsPage';
import HelpPage from '../HelpPage';
import './Dashboard.css';

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`dashboard ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Header />
      <div className="dashboard-body">
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/dashboard/:id" element={<DashboardDetailPage />} />
          <Route path="/datastream" element={<DataStreamPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
