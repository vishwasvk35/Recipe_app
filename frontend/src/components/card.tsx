import * as api from "./api";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function Card(props) {
  return (
    <div className="recipe-card" key={props.recipe.id}>
      <img src={props.recipe.image} alt={props.recipe.title} />
      <h1>
        {props.recipe.title}{" "}
        <span
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {props.isFavorite ? (
            <AiFillHeart
              onClick={props.onFavoriteButtonCLick}
              fill="red"
              size={25}
            />
          ) : (
            <AiOutlineHeart
              onClick={props.onFavoriteButtonCLick}
              fill="red"
              size={25}
            />
          )}
        </span>
      </h1>
    </div>
  );
}

export default Card;
