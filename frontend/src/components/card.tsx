function generateSummary() {
    return <h1>Summary genrated</h1>
}

function Card(props) {
  return (
    <div onClick={generateSummary} className="recipe-card" key={props.recipe.id}>
      <h1>{props.recipe.title}</h1>
      <img src={props.recipe.image} alt={props.recipe.title} />
    </div>
  );
}

export default Card;
