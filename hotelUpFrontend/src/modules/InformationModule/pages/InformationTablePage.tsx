import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getHotelEvents, getPlannedDishes } from "../services/informationService";
import { getFreeRooms } from "../../customerModule/services/customerService";
import EventComponent from "../components/EventComponent";
import DishComponent from "../components/DishComponent";
import AvailableRoomComponent from "../components/AvailableRoomComponent";
import './informationTable.css';

function InformationTablePage() {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [currentDataset, setCurrentDataset] = useState<'events' | 'dishes' | 'rooms'>('events');

  const { data: hotelEvents, isLoading: areHotelEventsLoading, isError: isHotelEventsError } = useQuery({
    queryKey: ['get-hotel-evens'],
    queryFn: getHotelEvents,
  });

  const { data: plannedDishes, isLoading: arePlannedDishesLoading, isError: isPlannedDishesError } = useQuery({
    queryKey: ['get-planned-dish'],
    queryFn: getPlannedDishes,
  });

  const { data: availableRooms, isLoading: areAvailableRoomsLoading, isError: isAvailableRoomsError } = useQuery({
    queryKey: ['get-available-rooms'],
    queryFn:() => getFreeRooms(),
  });

  useEffect(() => {
    if (!hotelEvents || !plannedDishes || !availableRooms) return;

    const timeout = setTimeout(() => {
      handleNext();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [hotelEvents, plannedDishes, availableRooms, currentDataset, currentIndex]);

  const datasets = {
    events: hotelEvents,
    dishes: plannedDishes,
    rooms: availableRooms,
  };

  const handleNext = () => {
    const currentData = datasets[currentDataset];
  
    if (currentData && currentIndex < currentData.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      const nextDataset =
        currentDataset === 'events'
          ? 'dishes'
          : currentDataset === 'dishes'
          ? 'rooms'
          : 'events';
      setCurrentDataset(nextDataset);
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    const currentData = datasets[currentDataset];
    if (currentData && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else {
      const previousDataset =
        currentDataset === 'events'
          ? 'rooms'
          : currentDataset === 'dishes'
          ? 'events'
          : 'dishes';
  
      const previousData = datasets[previousDataset];
      if (previousData) {
        setCurrentDataset(previousDataset);
        setCurrentIndex(previousData.length - 1);
      }
    }
  };

  if (areHotelEventsLoading || arePlannedDishesLoading || areAvailableRoomsLoading) {
    return <div>Loading...</div>;
  }

  if (isHotelEventsError || isPlannedDishesError || isAvailableRoomsError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="advert-container">
      <button
        onClick={handlePrevious}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 absolute left-0">
        ◀
      </button>
        {currentDataset === 'events' && hotelEvents && <EventComponent {...hotelEvents[currentIndex]}/>}
        {currentDataset === 'dishes' && plannedDishes && <DishComponent {...plannedDishes[currentIndex]}/>}
        {currentDataset === 'rooms' && availableRooms && <AvailableRoomComponent {...availableRooms[currentIndex]}/>}      
      <button
        onClick={handleNext}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 absolute right-0"
      >
        ▶
      </button>
    </div>
  );
};

export default InformationTablePage;