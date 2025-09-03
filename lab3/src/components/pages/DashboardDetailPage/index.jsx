import React from 'react';
import { useParams } from 'react-router-dom';

const DashboardDetailPage = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: '20px', flex: 1 }}>
      <h1>Dashboard Details</h1>
      <p>Details for dashboard with ID: <strong>{id}</strong></p>
      <p>Content for this specific dashboard will be displayed here.</p>
    </div>
  );
};

export default DashboardDetailPage;

