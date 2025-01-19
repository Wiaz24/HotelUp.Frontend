import './roomComponent.css';
import hotelImage from "../../../assets/images/hotel.jpg";
import { RoomProps } from '../../../modules/customerModule/models/roomTypes';
import RoomActionsComponent from './RoomActionsComponent';


function RoomComponent(props: RoomProps) {
  const image = hotelImage;
  
  return(<div className="room-box"> 
    <div className="room-info">
      <div className="image-div">
        <img src={image} alt="Image" className="room-image" />
      </div>
      <div className="description">
        <div>Typ: <span>{props.room.type}</span> </div>
        <div>Dla ilu osób? <span>{props.room.capacity}</span></div>
        <div>Piętro: <span>{props.room.floor}</span></div>
        <div>Od: <span>{props.startDate}</span></div>
        <div>Do: <span>{props.endDate}</span></div>
      </div>
    </div>
    <RoomActionsComponent {...props}></RoomActionsComponent>
  </div>);
}

export default RoomComponent;