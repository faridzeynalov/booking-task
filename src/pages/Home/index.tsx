import React from 'react';
import { useGetRoomsQuery } from '../../redux/roomsApi/roomsApi';
import floorPlan from '../../../public/Classroom.svg';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

const MainPage: React.FC = () => {
  const { data: rooms, isLoading } = useGetRoomsQuery();
  const navigate = useNavigate();

  const handleRoomClick = (roomId: number) => {
    navigate(`/rooms/${roomId}`);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Room Availability Management
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box position="relative">
          <img src={floorPlan} alt="Floor Plan" style={{ width: '100%' }} />
          {rooms?.map((room) => (
            <Box
              key={room.id}
              position="absolute"
              top={room.id * 100}  // Adjust according to room's actual position on the SVG
              left={room.id * 100}  // Adjust according to room's actual position on the SVG
              bgcolor={room.reservations.length > 0 ? 'red' : 'green'}
              width={300}
              height={300}
              onClick={() => handleRoomClick(room.id)}
              sx={{ cursor: 'pointer', opacity: 0.3 }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MainPage;
