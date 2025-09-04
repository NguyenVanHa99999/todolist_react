import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Sidebar from '../../organisms/Sidebar';
import Header from '../../organisms/Header';
import MainContent from '../../templates/MainContent';
import GoalsPage from '../GoalsPage';
import DashboardDetailPage from '../DashboardDetailPage';
import DataStreamPage from '../DataStreamPage';
import AnalysisPage from '../AnalysisPage';
import UsersPage from '../UsersPage';
import SettingsPage from '../SettingsPage';
import HelpPage from '../HelpPage';
import './Dashboard.css';

// Initial data for sidebar list
const initialDashboards = [
  { id: '1', emoji: '✅', name: 'Monthly OKRs' },
  { id: '2', emoji: '💡', name: 'Product Key Drivers' },
  { id: '3', emoji: '✏️', name: 'Design Team ORKs' },
];

// Initial data for dashboard details
const initialDashboardsData = {
  '1': {
    name: 'Monthly OKRs',
    emoji: '✅',
    tasks: [
      { id: '1-1', title: 'Finalize Q3 objectives', columnId: 'todo' },
      { id: '1-2', title: 'Review key results with team leads', columnId: 'inprogress' },
      { id: '1-3', title: 'Submit final OKR report', columnId: 'done' },
    ],
  },
  '2': {
    name: 'Product Key Drivers',
    emoji: '💡',
    tasks: [
      { id: '2-1', title: 'Analyze user engagement metrics', columnId: 'todo' },
      { id: '2-2', title: 'Prepare presentation for stakeholders', columnId: 'inprogress' },
    ],
  },
  '3': {
    name: 'Design Team ORKs',
    emoji: '✏️',
    tasks: [],
  },
};

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [dashboards, setDashboards] = useState(() => {
    try {
      const saved = localStorage.getItem('dashboards');
      return saved ? JSON.parse(saved) : initialDashboards;
    } catch (error) {
      return initialDashboards;
    }
  });

  const [dashboardsData, setDashboardsData] = useState(() => {
    try {
      const saved = localStorage.getItem('dashboardsData');
      return saved ? JSON.parse(saved) : initialDashboardsData;
    } catch (error) {
      return initialDashboardsData;
    }
  });

  useEffect(() => {
    localStorage.setItem('dashboards', JSON.stringify(dashboards));
  }, [dashboards]);

  useEffect(() => {
    localStorage.setItem('dashboardsData', JSON.stringify(dashboardsData));
  }, [dashboardsData]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleCreateDashboard = (icon, name) => {
    const newId = String(Date.now());
    setDashboards(prev => [...prev, { id: newId, emoji: icon, name }]);
    setDashboardsData(prev => ({ ...prev, [newId]: { name, emoji: icon, tasks: [] } }));
  };

  return (
    <div className={`dashboard ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Header />
      <div className="dashboard-body">
        <Sidebar
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
          dashboards={dashboards}
          handleCreateDashboard={handleCreateDashboard}
        />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route
            path="/dashboard/:id"
            element={<DashboardWrapper dashboardsData={dashboardsData} setDashboardsData={setDashboardsData} />}
          />
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

const DashboardWrapper = ({ dashboardsData, setDashboardsData }) => {
  const { id } = useParams();
  const currentDashboard = dashboardsData[id] || { name: 'New Dashboard', tasks: [] };

  const setTasks = (newTasks) => {
    setDashboardsData(prevData => ({
      ...prevData,
      [id]: { ...prevData[id], tasks: typeof newTasks === 'function' ? newTasks(prevData[id].tasks) : newTasks },
    }));
  };

  return <DashboardDetailPage key={id} currentDashboard={currentDashboard} setTasks={setTasks} />;
};

export default Dashboard;
