import { useNavigate } from "react-router-dom";
import { RoomProps } from "../../../modules/customerModule/models/roomTypes";
import { RoomStatus } from "../../models/roomStatus";


function RoomActionsComponent(props: RoomProps) {
  const navigate = useNavigate();

  const handleCreatingReservation = () => {
    navigate('/create-reservation', {state: {props}})
  };

  return (<div className="actions">
    {props.roomStatus === RoomStatus.AVAILABLE ? (<div className="actions">
      <button onClick={handleCreatingReservation}>Rezerwuj pokój</button>
    </div>) : 
    props.roomStatus === RoomStatus.RESERVED ? (<div className="actions">
      <button>Zamów sprzątanie</button>
      <button>Anuluj rezerwację</button>    
    </div>
    ) : null}
  </div>);
}

export default RoomActionsComponent;