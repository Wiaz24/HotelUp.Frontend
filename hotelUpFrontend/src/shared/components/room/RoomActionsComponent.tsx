import { useNavigate } from "react-router-dom";
import { RoomProps } from "../../../modules/customerModule/models/roomInterfaces";
import { RoomStatus } from "../../models/roomStatus";


function RoomActionsComponent(props: RoomProps) {
  const navigate = useNavigate();

  const handleCreatingReservation = () => {
    navigate('/create-reservation', {state: {props}});
  };

  const handleViewDetails = () => {
    navigate(`/reservation-details/${props.reservationId}`);
  };

  return (<>
    {props.roomStatus === RoomStatus.AVAILABLE ? (<div className="actions">
      <button onClick={handleCreatingReservation}>Rezerwuj pokój</button>
    </div>) : 
    props.roomStatus === RoomStatus.RESERVED ? (<div className="actions">
      <button onClick={handleViewDetails}> Szczegóły rezerwacji</button>
    </div>
    ) : null}
  </>);
}

export default RoomActionsComponent;