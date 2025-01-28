// import { useEffect, useState } from "react";
// import { useAuth } from "react-oidc-context";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CreateRepairTaskFormProps } from "../models/repairTaskInterfaces";
// import { useMutation } from "@tanstack/react-query";

// function CreateRepairTaskPage() {
//   const auth = useAuth();
//   const navigate = useNavigate();
//   const location= useLocation();
//   const [reservationRooms, setReservationRooms] = useState<number[]>([]);
//   const [reservationId, setReservationId] = useState<string>("");
//   const [roomNumber, setRoomNumber] = useState<number | undefined>(undefined);
//   const [token, setToken] = useState<string>("");

//   useEffect (() => {
//     const props = location.state as CreateRepairTaskFormProps || undefined;
//     if (props && auth.user) {
//       setReservationRooms(props.rooms);
//       setReservationId(props.id);
//       setToken(auth.user.access_token);
//     }
//     else {
//       navigate('/');
//       return;
//     }
//   }, [auth.user, location.state, navigate]);

//   const handleNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setRoomNumber(Number(e.target.value));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Reservation Id:", reservationId);
//     console.log("Selected Room Number:", roomNumber);
    
  
//     if (!roomNumber) {
//       alert("Numer jest wymagany.");
//       return;
//     }  
//     mutate( {roomNumber, token});
//   };

//   const { mutate } = useMutation({
//     mutationKey: ['create-cleaning-task'],
//     mutationFn: createReapairTask,
//     onSuccess: () => {
//       alert("Pomyślnie zlecono zadanie serwisu naprawczego");
//       navigate('/account');
//     },
//     onError: (error) => {
//       alert("Wystąpił błąd: " + error.message); // Obsługa błędów
//     },
//   });

//   if (reservationRooms.length == 0) {
//     return <div>Ładowanie danych...</div>;
//   }

//   return ( <div className="add-task-page"> 
//     <h3>Zamówienie sprzątania pokoju</h3>
//     <form className="add-task-form" onSubmit={handleSubmit}>
//       <div className="choice-element">
//         <label htmlFor="date-picker">Wybierz datę:</label>
        
//       </div>
//       <div className="choice-element">
//         <label htmlFor="room-select">Wybierz pokój:</label>
//         <select
//           id="number-select"
//           value={roomNumber ?? ""}
//           onChange={handleNumberChange}>
//             <option value="" disabled>
//               Wybierz numer pokoju
//             </option>
//             {reservationRooms.map((roomNumber, index) => (
//               <option key={index} value={roomNumber}>
//                 {roomNumber}
//               </option>
//             ))}
//           </select>
//         </div>
//       <div>
//         <button type="submit">Zatwierdź</button>
//       </div>
//     </form>
//   </div>);
// }
// export default CreateRepairTaskPage;