import { useLocation, useNavigate } from 'react-router-dom';
import './../../../shared/components/staff/common.css';
import { useEffect } from 'react';

function RepairTaskDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;
  
  useEffect(() => {
    if (!task) {
      navigate("/");
    }
  }, [task, navigate]);
  
  return (<div className="common-component">
    <div className="title">Zadanie {task.title}</div>
    <div className="title"> Opis zadania: {task.description}</div>
      <div className="single-element">
        <div className="details-info">
          <div> Zlecono na: {new Date(task.deadline).toLocaleDateString()}</div>
          <div> Data utworzenia: {new Date (task.created_at).toLocaleDateString()}</div>
          <div> Ostatnia zmiana: {new Date (task.last_update).toLocaleDateString()}</div>
          <div> Typ naprawy: {task.repairType}</div>
          <div> Koszt naprawy: {task.damage_repair_cost}</div>
        </div>
        <div className="details-info">
          <div> Status zadania: {task.status}</div>
          <div> Powiązana rezerwacja: {task.reservation_id}</div>
          <div> Numer pokoju: {task.room_number}</div>
          <div> Przydzielony serwisant: {task.janitor_id}</div>
          <div> ID naprawy: {task.id}</div>
        </div>
    </div>
  </div>);
}
export default RepairTaskDetails;