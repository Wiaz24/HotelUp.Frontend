import { Room } from "../../customerModule/models/roomTypes";

function AvailableRoomComponent(props: Room){
  return (<div className="current-advert">
    <div className="image-container">
      <img src={props.imageUrl} alt="Image" className="image"></img>
    </div>
    <div className="text-container">
      <h2>Wolne pokoje</h2>
      <p>Pokój typu {props.type}, znajduje się na piętrze {props.floor}.</p>
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