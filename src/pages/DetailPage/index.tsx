import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRoomQuery, useAddReservationMutation } from '../../redux/roomsApi/roomsApi';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const RoomDetailsPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { data: room, isLoading } = useGetRoomQuery(parseInt(roomId || ''));
  const [addReservation] = useAddReservationMutation();
  
  const [formState, setFormState] = useState({
    reservedBy: '',
    from: '',
    to: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddReservation = async () => {
    await addReservation({
      ...formState,
      roomId: room?.id,
    });
  };

  return (
    <Box p={4}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h5">Room {room?.id} Details</Typography>
          <Paper sx={{ mt: 4, p: 2 }}>
            <Typography variant="h6">Reservations</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Reserved By</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {room?.reservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.reservedBy}</TableCell>
                    <TableCell>{reservation.from}</TableCell>
                    <TableCell>{reservation.to}</TableCell>
                    <TableCell>{reservation.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <Paper sx={{ mt: 4, p: 2 }}>
            <Typography variant="h6">Add Reservation</Typography>
            <TextField
              label="Reserved By"
              name="reservedBy"
              fullWidth
              value={formState.reservedBy}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="From"
              name="from"
              type="date"
              fullWidth
              value={formState.from}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="To"
              name="to"
              type="date"
              fullWidth
              value={formState.to}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Notes"
              name="notes"
              fullWidth
              multiline
              value={formState.notes}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddReservation}>
              Add Reservation
            </Button>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default RoomDetailsPage;
