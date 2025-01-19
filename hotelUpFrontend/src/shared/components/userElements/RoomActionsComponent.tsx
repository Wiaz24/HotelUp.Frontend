import { RoomActionsProps } from "../../../modules/customerModule/models/types";
import { RoomStatus } from "../../models/roomStatus";


function RoomActionsComponent(props: RoomActionsProps) {

  return (<div className="actions">
    {props.roomStatus === RoomStatus.AVAILABLE ? (<div className="actions">
      <button>Rezerwuj pokój</button>
    </div>) : (<div className="actions">
      <button>Zamów sprzątanie</button>
      <button>Anuluj rezerwację</button>    
    </div>
    )}
  </div>);
}

export default RoomActionsComponent;