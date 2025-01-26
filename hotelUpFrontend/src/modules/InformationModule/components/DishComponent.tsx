import { PlannedDish } from "../models/informationInterfaces";
import './../pages/informationTable.css';

function DishComponent(props: PlannedDish) {
  return (<div className="current-advert">
    <div className="image-container">
      <img src={props.imageUrl} alt="Image" className="image"></img>
    </div>
    <div className="text-container">
      <h2>Szef kuchni poleca</h2>
      <h3>Dzisiejsze danie</h3> 
      <p><strong>{props.name}</strong></p>
    </div>
  </div>);
}
export default DishComponent;