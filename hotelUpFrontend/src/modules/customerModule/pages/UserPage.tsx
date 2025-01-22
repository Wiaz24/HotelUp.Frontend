import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import './userPage.css';
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsersReservations } from "../services/customerService";
import RoomComponent from "../../../shared/components/room/RoomComponent";
import { RoomProps } from "../models/roomTypes";
import { RoomStatus } from "../../../shared/models/roomStatus";

function UserPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const userGroups: string[] = Array.isArray(auth.user?.profile['cognito:groups']) 
  ? auth.user?.profile['cognito:groups'] 
  : [];

  const { data } = useQuery({
    queryKey: ['get-reservations'],
    queryFn: () => getUsersReservations(auth.user?.access_token ?? ""),
    enabled: !!auth.user?.access_token,
  });

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/');
    }
  
    if (userGroups) {
      console.log(userGroups);
    } else {
      console.log('userGroups is undefined');
    }
  
    if (data) {
      console.log(data);
    } else {
      console.log('data is undefined');
    }
  }, [auth.isAuthenticated, navigate, userGroups, data]);

  const signOutRedirect = () => {
    auth.removeUser();
    window.location.href = `${import.meta.env.VITE_COGNITO_DOMAIN}/logout?client_id=${import.meta.env.VITE_COGNITO_CLIENT}&logout_uri=${encodeURIComponent(import.meta.env.VITE_LOGOUT_URI)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL'); // Format: dd.mm.yyyy
  };

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  const transformedData: RoomProps[] = data?.flatMap((reservation) => 
    reservation.rooms.map((room) => ({
      room: room,
      startDate: formatDate(reservation.startDate),
      endDate: formatDate(reservation.endDate),
      roomStatus: RoomStatus.RESERVED,
    }))
  ) || [];

  if (auth.isAuthenticated) {
    return (
      <div className="user-page">
        <div className="welcome-text">Witaj: {auth.user?.profile.email} <button onClick={signOutRedirect}>Wyloguj się</button></div>
        <pre>ID Token: {auth.user?.id_token}</pre>
        <pre>Access Token: {auth.user?.access_token}</pre>
        <pre>Refresh Token: {auth.user?.refresh_token}</pre>
          {transformedData.length > 0 ? (
            <>
              <h3>Twoje rezerwacje:</h3>
              <div className="reservations-box">
            {transformedData.map((roomReservation, index) => (
              <RoomComponent key={index} room={roomReservation.room} startDate={roomReservation.startDate} endDate={roomReservation.endDate} roomStatus={roomReservation.roomStatus} ></RoomComponent>
                ))}
                </div>
              </>
            ) : (
              <p>Brak rezerwacji</p>
            )}
        </div>
    );
  }
};

export default UserPage;