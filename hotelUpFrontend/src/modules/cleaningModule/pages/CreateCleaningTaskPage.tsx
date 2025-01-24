import DatePicker from "react-datepicker";
import { CreateCleaningTaskFormProps } from "../models/cleaningTasktypes";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import "react-datepicker/dist/react-datepicker.css";
import "./../../../shared/components/taskPages.css";

function CreateCleaningTaskPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location= useLocation();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [reservationRooms, setReservationRooms] = useState<number[]>([]);
  const [reservationId, setReservationId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<number | undefined>(undefined);

  useEffect (() => {
    const props = location.state as CreateCleaningTaskFormProps || undefined;
    if (props && auth.user) {
      const parsedStartDate = new Date(props.startDate);
      const parsedEndDate = new Date(props.endDate);
      setStartDate(parsedStartDate);
      setEndDate(parsedEndDate);
      setReservationRooms(props.rooms);
      setReservationId(props.id);
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
    setSelectedRoom(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = selectedDate?.toISOString().split("T")[0];
    console.log("Reservation Id:", reservationId);
    console.log("Selected Date:", formattedDate);
    console.log("Selected Room Number:", selectedRoom);
  };

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
          value={selectedRoom ?? ""}
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