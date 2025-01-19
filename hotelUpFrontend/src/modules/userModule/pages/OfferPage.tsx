import { useState } from "react";

import './offerPage.css'
import { RoomType } from "../../../shared/models/roomTypes";

import hotelImage from "../../../assets/images/hotel.jpg";

function OfferPage() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [roomType, setRoomType] = useState<string>('');
  const [capacity, setCapacity] = useState<number | null>(null);
  const image = hotelImage;

  return (
    <div className="offer-page">
      <h2>Wybierz swój pokój</h2>
        <div className="filter-box">
          <div className="filters">
            <label>
              Data od:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              Data do:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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
          </div>
          <div>
            <button>Szukaj</button>
          </div>
        </div>
      <div className="free-rooms-box">
        <div className="room-box"> 
          <div>
            <img src={image} alt="Image" className="room-image" />
          </div>
          <div>
            <div>opis</div>
            <div>costam</div>
          </div>
        </div>
        <div className="room-box"> pokoj2 </div>
      </div>
      <p>
        Wybrany zakres: {startDate || '---'} do {endDate || '---'}
      </p>
      <p>Typ pokoju: {roomType !== null ? roomType : 'Nieokreślona'}</p>
      <p>Wybrana pojemność: {capacity !== null ? capacity : 'Nieokreślona'}</p>
    </div>
  );
}

export default OfferPage;