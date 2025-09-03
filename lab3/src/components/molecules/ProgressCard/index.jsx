import React from 'react';
import Card from '../../atoms/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const ProgressCard = ({ percent = 65, completed = 12, total = 20 }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#EAEAF4',
        borderRadius: '24px',
        padding: '24px',
        height: '449px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: '20px',
          fontWeight: 700,
          color: '#000000',
          mb: '24px',
        }}
      >
        Daily progress
      </Typography>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', display: 'inline-flex', width: 234, height: 234 }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={234}
            thickness={2.5}
            sx={{
              color: 'rgba(188, 191, 214, 0.3)',
              position: 'absolute',
              left: 0,
            }}
          />
          <CircularProgress
            variant="determinate"
            value={percent}
            size={234}
            thickness={2.5}
            sx={{
              color: '#65C8D0',
              filter: 'drop-shadow(0px 10px 25px rgba(148, 217, 223, 0.3))',
              strokeLinecap: 'round',
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h3" component="div" sx={{ fontSize: '48px', fontWeight: 700, color: '#1B1D29', mb: 1 }}>
              {`${percent}%`}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '15px', fontWeight: 500, color: '#82869E' }}>
              {`${completed}/${total} completed`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ProgressCard;
