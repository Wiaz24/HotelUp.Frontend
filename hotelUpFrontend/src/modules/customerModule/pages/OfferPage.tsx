import { useState } from "react";

import './offerPage.css'
import { RoomType } from "../../../shared/models/roomTypes";

import RoomComponent from "../../../shared/components/room/RoomComponent";
import { useQuery } from "@tanstack/react-query";
import { getFreeRooms } from "../services/customerService";
import { RoomStatus } from "../../../shared/models/roomStatus";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function OfferPage() {
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const formattedTomorrow = tomorrow.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState<string>(formattedToday);
  const [endDate, setEndDate] = useState<string>(formattedTomorrow);
  const [roomType, setRoomType] = useState<string>('');
  const [capacity, setCapacity] = useState<number | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: () => getFreeRooms(startDate, endDate, roomType, capacity),
  });

  const handleFetchData = () => {
    refetch();
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: {error.message}</p>;

  const rooms = data ?? [];

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      setStartDate(formattedDate);

      if (endDate && new Date(endDate) < date) {
        setEndDate("");
      }
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];

      if (startDate && new Date(startDate) > date) {
        alert("Data końcowa musi być późniejsza niż data początkowa");
        return;
      }
      setEndDate(formattedDate);
    }
  };


  return ( <div className="offer-page">
    <h2>Wybierz swój pokój</h2>
      <div className="filter-box">
        <div className="filters">
        <label>
        Data od:
        <DatePicker
          selected={new Date(startDate)}
          onChange={handleStartDateChange}
          dateFormat="yyyy-MM-dd"
          selectsStart
          startDate={new Date(startDate)}
          endDate={endDate ? new Date(endDate) : null}
          minDate={today}
        />
      </label>

          {/* <label>
            Data od:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
          </label> */}
          {/* <label>
            Data do:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
          </label> */}
          <label>
        Data do:
        <DatePicker
          selected={endDate ? new Date(endDate) : null}
          onChange={handleEndDateChange}
          dateFormat="yyyy-MM-dd"
          selectsEnd
          startDate={new Date(startDate)}
          endDate={endDate ? new Date(endDate) : null}
          minDate={new Date(startDate)}
        />
      </label>
          <label>
            Typ pokoju:
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
              <option value="">Brak preferencji</option>
              <option value={RoomType.BASIC}>Podstawowy</option>
              <option value={RoomType.ECONOMY}>Ekonomiczny</option>
              <option value={RoomType.PREMIUM}>Premium</option>
            </select>
          </label>
          <label>
            Liczba osób w pokoju:
            <select value={capacity !== null ? capacity : ''} onChange={(e) => setCapacity(e.target.value === '' ? null : parseInt(e.target.value))}>
              <option value="">Brak preferencji</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </label>
          <div>
            <button onClick={handleFetchData}>Szukaj</button>
          </div>
        </div>
        
      </div>
    <div className="free-rooms-box">
      {rooms.map(room => (
        <RoomComponent key={room.id} room={room} startDate={startDate} endDate={endDate} roomStatus={RoomStatus.AVAILABLE}></RoomComponent>
      ))}
    </div>
    <p>
      Wybrany zakres: {startDate || '---'} do {endDate || '---'}
    </p>
    <p>Typ pokoju: {roomType !== null ? roomType : 'Nieokreślona'}</p>
    <p>Wybrana pojemność: {capacity !== null ? capacity : 'Nieokreślona'}</p>
  </div>);
}

export default OfferPage;