import { useState } from "react";
import { DocumentType } from "../models/documentTypes";

import './tenantFormComponent.css'

function TenantFormComponent () {

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [pesel, setPesel] = useState<string>('');
  const [documentType, setDocumentType] = useState<DocumentType>(DocumentType.ID_CARD);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', { firstName, lastName, pesel, phoneNumber, email, documentType }); 
  }
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

export default TenantFormComponent;