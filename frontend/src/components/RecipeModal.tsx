import { useEffect, useState } from "react";
import { summaryRecipe } from "./api";

function RecipeModal(props) {
  const [data, setData] = useState(props.recipeId);
  console.log("recipemodal");

  if (!props.recipeId) {
    return <></>;
  }

  console.log(props.recipeId);

  useEffect(() => {
    if (!props.recipeId) return;

    console.log("fetching");

    async function fetchData(recipeId: string) {
      setData(await summaryRecipe(recipeId));
    }

    fetchData(props.recipeId);
  }, [props.recipeId]);

  return (
    <>
      <div className="overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{data.title}</h2>
            <span className="close-button" onClick={ ()=>{props.handleSummary("")}}>[X]</span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: data.summary }}></p>
        </div>
      </div>
    </>
  );
}

export default RecipeModal;
