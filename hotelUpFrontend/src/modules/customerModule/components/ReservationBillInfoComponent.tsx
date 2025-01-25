import { Bill } from "../models/billTypes";
import './../pages/reservationDetailsPage.css';

function ReservationBillInfoComponent(props: Bill) {
  return(<div className="details-part-content">
    <div className="part-column">
      <h4>Cena zakwaterowania:</h4>
      <div> {props.accomodationPrice || "Brak - rezerwacja anulowana"} </div>
    </div>
    {props?.additionalCosts && props.additionalCosts.length === 0 ? (
      <div className="part-column">
        <h4>Brak dodatkowych kosztów </h4> 
      </div>
    ) : (props.additionalCosts?.map((additionalCost, index) => (
      <div className="part-column">
        <h4>Dodatkowy koszt {index + 1} </h4>
        <div>Identyfikator kosztu: {additionalCost.taskId}</div>
        <div>Cena: {additionalCost.price}</div>
      </div>
    )))}
    {props.payments && props.payments.length === 0 ? (
      <div className="part-column">
        <h4>Płatności:</h4>
        <div>Brak</div>
      </div>    
    ) : (
      props.payments?.map((payment, index) => (
        <div className="part-column">
          <h4>Płatność {index + 1}</h4>
          <div> Data: {payment.settlementDate} </div>
          <div> Kwota: {payment.amount} </div>
        </div>    
    )))}
  </div>);
}
export default ReservationBillInfoComponent;