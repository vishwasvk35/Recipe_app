import * as api from "./api";

function Card(props) {
  return (
    <div className="recipe-card" key={props.recipe.id}>
      <h1>{props.recipe.title}</h1>
      <img src={props.recipe.image} alt={props.recipe.title} />
    </div>
  );
}

export default Card;
