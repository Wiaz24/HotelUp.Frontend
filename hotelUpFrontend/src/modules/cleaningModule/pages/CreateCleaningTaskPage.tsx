import DatePicker from "react-datepicker";
import { CreateCleaningTaskFormProps } from "../models/cleaningTaskTypes";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import "react-datepicker/dist/react-datepicker.css";
import "./../../../shared/components/taskPages.css";
import { useMutation } from "@tanstack/react-query";
import { createCleaningTask } from "../services/cleaningService";

function CreateCleaningTaskPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location= useLocation();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [reservationRooms, setReservationRooms] = useState<number[]>([]);
  const [reservationId, setReservationId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [roomNumber, setRoomNumber] = useState<number | undefined>(undefined);
  const [token, setToken] = useState<string>("");

  useEffect (() => {
    const props = location.state as CreateCleaningTaskFormProps || undefined;
    if (props && auth.user) {
      const parsedStartDate = new Date(props.startDate);
      const parsedEndDate = new Date(props.endDate);
      setStartDate(parsedStartDate);
      setEndDate(parsedEndDate);
      setReservationRooms(props.rooms);
      setReservationId(props.id);
      setToken(auth.user.access_token);
    }
    else {
      navigate('/');
      return;
    }
  }, [auth.user, location.state, navigate]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomNumber(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const realisationDate = selectedDate?.toISOString().split("T")[0];
    console.log("Reservation Id:", reservationId);
    console.log("Selected Date:", realisationDate);
    console.log("Selected Room Number:", roomNumber);
    
    if (!realisationDate) {
      alert("Data jest wymagana.");
      return;
    }
  
    if (!roomNumber) {
      alert("Numer jest wymagany.");
      return;
    }  
    mutate( {reservationId, realisationDate, roomNumber, token});
  };

  const { mutate } = useMutation({
    mutationKey: ['create-cleaning-task'],
    mutationFn: createCleaningTask,
    onSuccess: () => {
      alert("Pomyślnie zlecono zadanie sprzątania");
      navigate('/account');
    },
    onError: (error) => {
      alert("Wystąpił błąd: " + error.message); // Obsługa błędów
    },
  });

  if (!startDate || !endDate || reservationRooms.length == 0) {
    return <div>Ładowanie danych...</div>;
  }

  return ( <div className="add-task-page"> 
    <h3>Zamówienie sprzątania pokoju</h3>
    <form className="add-task-form" onSubmit={handleSubmit}>
      <div className="choice-element">
        <label htmlFor="date-picker">Wybierz datę:</label>
        <DatePicker
          id="date-picker"
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={startDate}
          maxDate={endDate}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div className="choice-element">
        <label htmlFor="room-select">Wybierz pokój:</label>
        <select
          id="number-select"
          value={roomNumber ?? ""}
          onChange={handleNumberChange}>
            <option value="" disabled>
              Wybierz numer pokoju
            </option>
            {reservationRooms.map((roomNumber, index) => (
              <option key={index} value={roomNumber}>
                {roomNumber}
              </option>
            ))}
          </select>
        </div>
      <div>
        <button type="submit">Zatwierdź</button>
      </div>
    </form>
  </div>);
}
export default CreateCleaningTaskPage;