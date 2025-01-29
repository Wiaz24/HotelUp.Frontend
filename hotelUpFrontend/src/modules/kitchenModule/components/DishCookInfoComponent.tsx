import { Dish } from "../models/dishInterfaces";
import './dishCookInfoComponent.css';

function DishCookInfoComponent(props: Dish){
  return (<div className="dish-container">
    <div className="dish-info">
      <div> Nazwa: {props.name}</div>
      <div> Cena: {props.price.amount}{props.price.currency}</div>
    </div>
    <div className="dish-image">
      <img className="image-cook-dish-info" src={props.imageUrl.value}></img>
    </div>    
  </div>);
}
export default DishCookInfoComponent;