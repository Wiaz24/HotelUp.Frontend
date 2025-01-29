import { RoomInformation } from "../models/informationInterfaces";

function AvailableRoomComponent(props: RoomInformation){
  return (<div className="current-advert">
    <div className="image-container">
      <img src={props.imageUrl} alt="Image" className="image"></img>
    </div>
    <div className="text-container">
      <h2>Wolne pokoje</h2>
      <p>Ile osób pomieści pokój? {props.capacity}</p>
      {props.withSpecialNeeds ? (
        <p>Pokój jest dostosowany dla osób ze specjalnymi potrzebami</p>
        ) : (
        null
      )}
    </div>
  </div>);
}
export default AvailableRoomComponent;