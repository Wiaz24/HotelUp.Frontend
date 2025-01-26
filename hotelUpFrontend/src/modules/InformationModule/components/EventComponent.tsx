import { HotelEvent } from "../models/informationInterfaces";
import hotelImage from "../../../assets/images/hotel.jpg";

function EventComponent(props: HotelEvent) {
  const eventImage = hotelImage;
  const date = new Date (props.date).toISOString().split('T')[0];
  return (<div className="current-advert">
    <div className="image-container">
      <img src={eventImage} alt="Image" className="image"></img>
    </div>
    <div className="text-container">
      <h2>Wydarzenia odbywające się w hotelu</h2>
      <p><strong>{props.title}</strong></p>
      <p>Kiedy: {date}</p>
      <p>{props.description}</p>
      <p>Numer identyfikujący wydarzenia: {props.id}</p>
    </div>
  </div>);
}
export default EventComponent;