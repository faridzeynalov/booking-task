import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IReservation {
  id: number;
  roomId: number;
  reservedBy: string;
  from: string;
  to: string;
  notes: string;
}

interface IRoom {
  id: number;
  reservations: IReservation[];
}

export const roomsApi = createApi({
  reducerPath: 'roomsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    getRooms: builder.query<IRoom[], void>({
      query: () => 'rooms',
    }),
    getRoom: builder.query<IRoom, number>({
      query: (id) => `rooms/${id}`,
    }),
    addReservation: builder.mutation<IReservation, Partial<IReservation>>({
      query: (newReservation) => ({
        url: `rooms/${newReservation.roomId}/reservations`,
        method: 'POST',
        body: newReservation,
      }),
    }),
  }),
});

export const { useGetRoomsQuery, useGetRoomQuery, useAddReservationMutation } = roomsApi;
