import { useEffect, useState } from "react";
import foodImage from "../../../assets/images/food.jpg";
import hotelImage from "../../../assets/images/hotel.jpg";
import './informationTable.css'

function InformationTablePage() {
  const images = [hotelImage, foodImage];
  const [currentIndex, setCurrentIndex] = useState(0);
  const texts = [
    {
      title: "Dostępność pokoi",
      description: "Aktualnie mamy dostępne 100 pokoi hotelowych",
    },
    {
      title: "Szef kuchni poleca",
      description: "Nasze menu oferuje szeroki wybór dań przygotowanych z najlepszych składników. Przyjdź i spróbuj wyjątkowych smaków naszych potraw.",
    },
  ];
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex]);
  return (
    <div className="advert-container">
      <div className="image-container">
        <img src={images[currentIndex]} alt="Image" className="image" />
        <div className="arrow-buttons">
          <button className="change-button" onClick={prevImage}>&lt;</button>
          <button className="change-button" onClick={nextImage}>&gt;</button>
        </div>
      </div>
      <div className="text-container">
        <h2>{texts[currentIndex].title}</h2>
        <p>{texts[currentIndex].description}</p>
      </div>
    </div>
  );
}

export default InformationTablePage;