import { useLocation } from "react-router-dom";
import TenantFormComponent from "../components/TenantFormComponent";
import { useEffect, useState } from "react";
import RoomComponent from "../../../shared/components/userElements/RoomComponent";
import { RoomProps } from "../models/roomTypes";
import { RoomStatus } from "../../../shared/models/roomStatus";

import './reserveRoomPage.css';

function ReserveRoomPage(){
  const location = useLocation();
  const [roomProps, setRoomProps] = useState<RoomProps | null>(null);

  useEffect(() => {
    const initialRoomProps: RoomProps = location.state?.props;
    if (initialRoomProps) {
      initialRoomProps.roomStatus = RoomStatus.PENDING_RESERVATION;
      setRoomProps(initialRoomProps);
    }
  }, [location]);
  
  useEffect(() => {
    if (roomProps) {
      console.log(roomProps);
    }
  })

  if (!roomProps) {
    return <div>Loading...</div>;
  }

  return (<div className="reservation-component">
    <RoomComponent {...roomProps}></RoomComponent>
    <h3>Dane właściciela rezerwacji:</h3>
    <TenantFormComponent></TenantFormComponent>
  </div>);
}

export default ReserveRoomPage;