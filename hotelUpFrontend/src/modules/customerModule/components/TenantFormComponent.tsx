import { useEffect, useState } from "react";
import { DocumentType } from "../models/documentTypes";

import './tenantFormComponent.css'
import { createReservation } from "../services/customerService";
import { RoomProps } from "../models/roomTypes";
import { useAuth } from "react-oidc-context";
import { ReservationStatus } from "../models/reservationStatus";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Tenant } from "../models/tenantTypes";

function TenantFormComponent (props: RoomProps) {
  const auth = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [pesel, setPesel] = useState<string>('');
  const [documentType, setDocumentType] = useState<DocumentType>(DocumentType.ID_CARD);


  const { mutate, isError, error, isSuccess } = useMutation({
    mutationKey: ['create-reservation'],
    mutationFn: createReservation,
    onSuccess: () => {
      navigate('/account');
    },
  });
  

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  // if (isSuccess) {
  //   navigate('/account');
  //   return null;
  // }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (auth.user?.id_token) {
      const tenantsData: Tenant[] = [
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          pesel: pesel,
          documentType: documentType,
          status: ReservationStatus.PENDING,
        },
      ];
      const token = auth.user.id_token;
      const startDate = props.startDate;
      const endDate = props.endDate;
      const roomNumbers = [props.room.id];
      mutate({ roomNumbers, tenantsData, startDate, endDate, token  });
      console.log(auth.user.id_token);
    }
    console.log('Form data:', { firstName, lastName, pesel, phoneNumber, email, documentType }); 
  };

  if (auth.isAuthenticated) {
    return (<form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">Imię:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Wprowadź imię"
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Nazwisko:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Wprowadź nazwisko"
          required
        />
      </div>
      <div>
        <label htmlFor="pesel">PESEL:</label>
        <input
          type="text"
          id="pesel"
          value={pesel}
          onChange={(e) => setPesel(e.target.value)}
          placeholder="Wprowadź PESEL"
          pattern="\d{11}"
          title="PESEL musi składać się dokładnie z 11 cyfr"
          maxLength={11}
          required
        />
      </div>
  
      <div>
        <label htmlFor="phoneNumber">Numer telefonu:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Wprowadź numer telefonu"
          pattern="\d{9}"
          title="Numer telefonu musi składać się dokładnie z 9 cyfr"
          required
        />
      </div>
  
      <div>
        <label htmlFor="email">Adres email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Wprowadź adres email"
          required
        />
      </div>
      <div>
        <label>Typ dokumentu: </label>  
          <select value={documentType} onChange={(e) => setDocumentType(e.target.value as DocumentType)}>
            <option value={DocumentType.ID_CARD}>Dowód osobisty</option>
            <option value={DocumentType.PASSPORT}>Paszport</option>
          </select>
      </div>
      <button type="submit">Rezerwuję pokój</button>
    </form>)
  }
  else {
    return (
      <button className="log-button" onClick={() => auth.signinRedirect()}>Logowanie</button> 
    );
  }
}

export default TenantFormComponent;