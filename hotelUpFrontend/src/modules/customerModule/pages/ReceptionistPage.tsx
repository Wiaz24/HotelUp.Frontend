import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { mutationGetUsersReservationsByIdWrapper } from "../services/customerService";
import './receptionistPage.css';

function ReceptionistPage() {
  const [reservationId, setReservationId] = useState<string>("");
  const auth = useAuth();
  const navigate = useNavigate();
  const userGroups: string[] = Array.isArray(auth.user?.profile["cognito:groups"])
    ? auth.user?.profile["cognito:groups"]
    : [];

  useEffect(() => {
    if (!auth.isAuthenticated || (!userGroups.includes("Receptionists") && !userGroups.includes("Admins"))) {
      console.log(userGroups);
      navigate('/');
    }
  }, [auth.isAuthenticated, navigate]);

  const { mutate } = useMutation({
    mutationKey: ['get-reservation-by-id'],
    mutationFn: mutationGetUsersReservationsByIdWrapper,
    onSuccess: () => {
      navigate(`/reservation-details/${reservationId}`);
    },
    onError: () => {
      alert("Nie udało się znaleźć rezerwacji");
    },
  });
  
  const handleSearch = () => {
    if (auth.user?.access_token && reservationId) {
      mutate({ token: auth.user.access_token, id: reservationId });
    }
  };

  return (<div className="receptionist-page">
    <input type="text" value={reservationId} onChange={(e) => setReservationId(e.target.value)} placeholder="Wpisz ID rezerwacji" ></input>
    <button onClick={handleSearch}>Szukaj rezerwację</button>
  </div>);
}
export default ReceptionistPage;