import Card from '../../atoms/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// MUI Icon Imports
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckIcon from '@mui/icons-material/Check';
import DragHandleIcon from '@mui/icons-material/DragHandle'; // Using this for medium priority

const TaskCard = ({ task }) => {
  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'highest':
      case 'high':
        return {
          Icon: <ArrowUpwardIcon sx={{ fontSize: '16px' }} />,
          styles: {
            backgroundColor: '#FFE0E3',
            color: '#DA4343',
          },
        };
      case 'medium':
        return {
          Icon: <DragHandleIcon sx={{ fontSize: '16px' }} />,
          styles: {
            backgroundColor: '#FFEED9',
            color: '#FFA940',
          },
        };
      case 'low':
        return {
          Icon: <CheckIcon sx={{ fontSize: '16px' }} />,
          styles: {
            backgroundColor: '#EAFAEF',
            color: '#30CD60',
          },
        };
      default:
        return {
          Icon: null,
          styles: {},
        };
    }
  };

  const { Icon, styles: priorityStyles } = getPriorityInfo(task.priority);

  return (
    <Card
      sx={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #F3F4F6',
        width: '100%',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 10px 24px rgba(0, 0, 0, 0.06)',
        },
        // Apply highlighted shadow for specific task ID if needed
        ...(task.id === 2 && { boxShadow: '0 10px 24px rgba(0, 0, 0, 0.06)' }),
      }}
    >
      <CardContent sx={{ p: '12px 16px !important', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Typography
          variant="caption"
          sx={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.02em',
            color: '#C8CDD9',
          }}
        >
          {task.date}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#1B1D29',
          }}
        >
          {task.title}
        </Typography>
      </CardContent>
      {Icon && (
        <Box
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            ...priorityStyles,
          }}
        >
          {Icon}
        </Box>
      )}
    </Card>
  );
};

export default TaskCard;
