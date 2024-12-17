import "./App.css";
import { useState } from "react";
import searchRecipe from "./api";
import { Recipe } from "./type";

function App() {
  const [searchTerm, setSearchTerm] = useState("paneer");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  async function handleSubmit() {
    try {
      const response = await searchRecipe(searchTerm, 1);
      console.log("API Response:", response);

      setRecipes(response.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }

  return (
    <div>
      <button onClick={handleSubmit}>Search</button>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <h1>{recipe.title}</h1>
          <img src={recipe.image} alt={recipe.title} />
        </div>
      ))}
    </div>
  );
}

export default App;
