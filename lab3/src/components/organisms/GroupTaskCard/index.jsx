import React from 'react';
import Card from '../../atoms/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const GroupTaskCard = ({ title, description, completed, total, avatars, progressBarColor }) => {
  const progress = (completed / total) * 100;

  return (
    <Card
      sx={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        border: '1px solid #F3F4F6',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>
          {title}
        </Typography>
        <IconButton size="small" sx={{ color: '#9CA3AF' }}>
          <MoreHorizIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" sx={{ fontSize: '14px', color: '#6B7280', mb: 2 }}>
        {description}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: '8px',
          borderRadius: '99px',
          backgroundColor: '#E5E7EB',
          mb: 1.5,
          '& .MuiLinearProgress-bar': {
            backgroundColor: progressBarColor,
            borderRadius: '99px',
          },
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" sx={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>
          {completed}/{total} COMPLETED
        </Typography>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 28,
              height: 28,
              border: '2px solid #fff',
              marginLeft: '-8px',
            },
          }}
        >
          {avatars.map((avatar, index) => (
            <Avatar key={index} alt={`Avatar ${index + 1}`} src={avatar} />
          ))}
        </AvatarGroup>
      </Box>
    </Card>
  );
};

export default GroupTaskCard;
