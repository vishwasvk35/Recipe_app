import "./App.css";
import { useState, useRef } from "react";
import * as api from "./api";
import { Recipe } from "./type";
import Card from "./card";
import RecipeModal from "./RecipeModal";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("paneer");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [summaryToggle, setSummaryToggle] = useState<string | undefined>(
    undefined
  );
  const pageNum = useRef(1);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    setSearchTerm(text);
  }

  async function handleSubmit() {
    try {
      const response = await api.searchRecipe(searchTerm, pageNum.current);
      console.log("API Response:", response);
      setRecipes(response.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }

  async function handleViewMore() {
    pageNum.current += 1;

    try {
      const moreRecipe = await api.searchRecipe(searchTerm, pageNum.current);
      setRecipes([...recipes, ...moreRecipe.results]);
      pageNum.current = pageNum.current;
      console.log("done");
    } catch (error) {
      console.log(error);
    }
  }

  function handleSummary(recipeId: string) {
    console.log("handle summary");
    setSummaryToggle(recipeId);
  }

  return (
    <div>
      <input
        onChange={handleChange}
        type="text"
        name="searchTerm"
        id="searchTerm"
        placeholder="search recipe"
      />
      <button onClick={handleSubmit}>Search</button>
      {recipes.map((recipe: Recipe) => (
        <div>
          <Card recipe={recipe} />
          <button onClick={() => 
            handleSummary(String(recipe.id || ""))
            }>
            summary
          </button>
        </div>
      ))}

      <button onClick={handleViewMore}>view more</button>

      {summaryToggle ? <div><RecipeModal handleSummary={handleSummary} recipeId={summaryToggle}/></div> : null}
    </div>
  );
}

export default App;
