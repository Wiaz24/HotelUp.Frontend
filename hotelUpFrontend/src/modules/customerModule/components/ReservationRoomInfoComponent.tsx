import { Room } from "../models/roomTypes";
import './../pages/reservationDetailsPage.css';


function ReservationRoomInfoComponent(props: Room) {
  return (<div>
    <div><span>Piętro:</span> {props.floor} </div>
    <div><span>Dostosowany dla osób ze specjalnymi potrzebami:</span> {props.withSpecialNeeds} </div>
    <div><span>Numer pokoju:</span> {props.id} </div>
    <div><span>Typ pokoju:</span> {props.type} </div>
    <div><span>Dla ilu osób:</span> {props.capacity} </div>
  </div>);
}
export default ReservationRoomInfoComponent;