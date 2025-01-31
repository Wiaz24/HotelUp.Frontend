import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateRepairTaskFormProps } from "../models/repairTaskInterfaces";
import { useMutation } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import { createRepairTask } from "../services/repairService";

function CreateRepairTaskPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location= useLocation();
  const [reservationRooms, setReservationRooms] = useState<number[]>([]);
  const [reservationId, setReservationId] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<number | undefined>(undefined);
  const [token, setToken] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  useEffect (() => {
    const props = location.state as CreateRepairTaskFormProps || undefined;
    if (props && auth.user) {
      const parsedEndDate = new Date(props.endDate);
      const parsedStartDate = new Date(props.startDate);
      setReservationRooms(props.rooms);
      setReservationId(props.id);
      setToken(auth.user.access_token);
      setStartDate(parsedStartDate);
      setEndDate(parsedEndDate);
    }
    else {
      navigate('/');
      return;
    }
  }, [auth.user, location.state, navigate]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomNumber(Number(e.target.value));
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const deadline = selectedDate?.toISOString().split("T")[0];
    console.log("Reservation Id:", reservationId);
    console.log("Selected Room Number:", roomNumber);

    if (!deadline) {
      alert("Data jest wymagana.");
      return;
    }
    if (!roomNumber) {
      alert("Numer jest wymagany.");
      return;
    }  
    mutate( {title, reservationId, description, roomNumber, deadline, token});
  };

  

  const { mutate } = useMutation({
    mutationKey: ['create-cleaning-task'],
    mutationFn: createRepairTask,
    onSuccess: () => {
      alert("Pomyślnie zlecono zadanie serwisu naprawczego");
      navigate('/account');
    },
    onError: (error) => {
      alert("Wystąpił błąd: " + error.message);
    },
  });

  if (reservationRooms.length == 0) {
    return <div>Ładowanie danych...</div>;
  }

  return ( <div className="add-task-page"> 
    <h3>Zamówienie serwisu naprawczego</h3>
    <form className="add-task-form" onSubmit={handleSubmit}>
      <div className="choice-element">
        <label htmlFor="title">Nazwa usterki:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="choice-element">
        <label htmlFor="description">Krótki opis usterki:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div className="choice-element">
        <label htmlFor="date-picker">Wybierz datę realizacji:</label>
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
      <div> <button type="submit">Zatwierdź</button> </div>
    </form>
  </div>);
}
export default CreateRepairTaskPage;