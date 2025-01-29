import { useLocation, useNavigate } from "react-router-dom";
import TenantFormComponent from "../components/TenantFormComponent";
import { useEffect, useState } from "react";
import RoomComponent from "../../../shared/components/room/RoomComponent";
import { RoomProps } from "../models/roomInterfaces";
import { RoomStatus } from "../../../shared/models/roomStatus";

import './reserveRoomPage.css';

function ReserveRoomPage(){
  const location = useLocation();
  const navigate = useNavigate();
  const [roomProps, setRoomProps] = useState<RoomProps | null>(null);

  useEffect(() => {
    const initialRoomProps: RoomProps = location.state?.props;
    if (initialRoomProps) {
      initialRoomProps.roomStatus = RoomStatus.PENDING_RESERVATION;
      setRoomProps(initialRoomProps);
      console.log(initialRoomProps);
    }
    else {
      navigate('/');
    }
  }, [location]);
  

  if (roomProps) {
    return (<div className="reservation-component">
      <RoomComponent {...roomProps}></RoomComponent>
      <h3>Dane gości:</h3>
      <TenantFormComponent {...roomProps}></TenantFormComponent>
    </div>);
  }
}

export default ReserveRoomPage;