import { useAuth } from 'react-oidc-context';
import './reservationDetailsPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { cancelReservation, getUsersReservationsById } from '../services/customerService';
import { useEffect, useState } from 'react';
import ReservationRoomInfoComponent from '../components/ReservationRoomInfoComponent';
import ReservationTenantInfoComponent from '../components/ReservationTenantInfoComponent';
import ReservationBillInfoComponent from '../components/ReservationBillInfoComponent';
import { CreateCleaningTaskFormProps } from '../../cleaningModule/models/cleaningTaskInterfaces';
import { ReservationStatus } from '../models/reservationStatus';
import { HotelDay } from '../models/hotelDay';
import { CreateRepairTaskFormProps } from '../../repairModule/models/repairTaskInterfaces';

function ReservationDetailsPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [token, setToken] = useState<string>("");

  const {data} = useQuery({
    queryKey: ['get-reservation-by-id'],
    queryFn: () => {
      if (id && auth.user?.access_token) {
        return getUsersReservationsById(auth.user.access_token ?? "", id);
      } 
    },
    enabled: !!auth.user?.access_token && !!id,
  });

  const { mutate } = useMutation({
    mutationKey: ['cancel-reservation'],
    mutationFn: cancelReservation,
    onSuccess: () => {
      alert('Pomyślnie anulowano rezerwację');
      navigate('/account');
    },
    onError: (error: any) => {
      const errorMessage = error.message;
      const errorCode = error.code;
      alert(`Błąd: ${errorMessage}\nTyp błędu: ${errorCode}`);
    },
  });

  useEffect(() => {
    if (!auth.user) {
      navigate('/');
    }
    else {
      setToken(auth.user.access_token);
    }
  
    if (data) {
      console.log(data);
    } else {
      console.log('data is undefined');
    }
  }, [auth.user, navigate, data]);

  if (!data) {
    return <p>Error while loading data.</p>
  }

  const handleCleaningRedirect = () => {
    const roomNumbers = data.rooms.map((room) => room.id);
    const formProps: CreateCleaningTaskFormProps = {
      startDate: data.startDate,
      endDate: data.endDate,
      rooms: roomNumbers,
      id: data.id
    };
    navigate("/add-cleaning-task", {state: formProps});
  };

  const handleRepairRedirect = () => {
    const roomNumbers = data.rooms.map((room) => room.id);
    const formProps: CreateRepairTaskFormProps = {
      id: data.id,
      rooms: roomNumbers,
      startDate: data.startDate,
      endDate: data.endDate,
    };
    navigate("/add-repair-task", {state: formProps});
  };

  const handleCancelReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const reservationId = data.id;
    const isConfirmed = window.confirm("Czy na pewno chcesz anulować rezerwację?");
    if (isConfirmed) {
      mutate({ token: token, id: reservationId });
    } else {
      console.log("Użytkownik przerwał anulowanie rezerwacji");
    }
  };

  return ( <div className="reservation-details-container">
  <div className="main-info">
      <h2>Szczegóły rezerwacji</h2>
      <h3>Numer rezerwacji: <strong> {data?.id} </strong></h3>
  </div>

  <div className="details-part-box">
    <div className="details-part-title">Informacje o lokatorach</div>
    <div className="details-part-content">
      {data?.tenants.map((tenant, index) => (
        <div className="part-column">
          <h4>Lokator {index + 1} </h4>
          <ReservationTenantInfoComponent {...tenant}></ReservationTenantInfoComponent>
        </div>
      ))}
    </div>
  </div>

  <div className="details-part-box">
    <div className="details-part-title">Informacje o rezerwacji</div>
    <div className="details-part-content">
      <div className="part-column">
        <h4>Data i godzina zameldowania:</h4>
        <div> {data?.startDate ? `${new Date(data.startDate).toLocaleDateString()}  godzina ${HotelDay.START}`: ""} </div>
      </div>
      <div className="part-column">
        <h4>Data i godzina wymeldowania:</h4>
        <div> {data?.endDate ? `${new Date(data.endDate).toLocaleDateString()} godzina ${HotelDay.END}` : ""} </div>
      </div>
      <div className="part-column">
        <h4>Status rezerwacji</h4>
        <div> {data?.status == ReservationStatus.VALID 
        ? "Rezerwacja aktywna" 
        : "Rezerwacja anulowana"
        } </div>
      </div>
    </div>
  </div>

  <div className="details-part-box">
    <div className="details-part-title">Szczegóły pokoi</div>
    <div className="details-part-content">
      {data?.rooms.map((room, index) => (
        <div className="part-column">
          <h4>Pokój {index + 1}</h4>
          <ReservationRoomInfoComponent {...room}></ReservationRoomInfoComponent>
        </div>
      ))}
    </div>
  </div>

  <div className="details-part-box">
    <div className="details-part-title">Opłaty</div>
    <ReservationBillInfoComponent {...data.bill}></ReservationBillInfoComponent>
  </div>

  <div className="reservation-actions">
    <button onClick={handleCleaningRedirect}>Zamów sprzątanie</button>
    <button onClick={handleRepairRedirect}>Zamów serwis naprawczy</button>
    <button onClick={handleCancelReservation}>Anuluj rezerwację</button>
  </div>

  <footer>
      © 2025, HotelUp. W razie pytań, skontaktuj się z nami: help@hotelup.com
  </footer>
</div>);
}

export default ReservationDetailsPage;