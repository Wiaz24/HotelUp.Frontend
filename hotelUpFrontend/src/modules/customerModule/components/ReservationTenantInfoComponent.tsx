import { DocumentType } from "../models/documentTypes";
import { Tenant } from "../models/tenantInterfaces";
import './../pages/reservationDetailsPage.css';

function ReservationTenantInfoComponent(props: Tenant) {
  return(<div>
    <div><span>Imię i nazwisko:</span> {props.firstName} {props.lastName}</div>
    <div><span>Dokument:</span> {props.documentType === DocumentType.ID_CARD ? "Dowód osobisty" : "Paszport"} </div>
    <div><span>Numer telefonu:</span> {props.phoneNumber} </div>
    <div><span>Adres email:</span> {props.email} </div>
    <div><span>Pesel:</span> {props.pesel} </div>
    <div><span>Status zameldowania:</span> {props.status} </div>
  </div>)
}
export default ReservationTenantInfoComponent;