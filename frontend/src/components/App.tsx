import "./App.css";
import { useState, useRef, useEffect } from "react";
import * as api from "./api";
import { Recipe } from "./type";
import Card from "./card";
import RecipeModal from "./RecipeModal";
import { AiOutlineSearch } from "react-icons/ai";

type Tabs = "Search" | "Favorites";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("paneer");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [summaryToggle, setSummaryToggle] = useState<string | undefined>(
    undefined
  );
  const [selectedTab, setSelectedTab] = useState<Tabs>("Search");
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const pageNum = useRef(1);

  useEffect(() => {
    async function fetchFavoriteRecipes() {
      try {
        const fetchedFavRecipes = await api.getFavoriteRecipes();
        console.log(fetchedFavRecipes);
        setFavoriteRecipes(fetchedFavRecipes.results);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFavoriteRecipes();
  }, []);

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

  async function addFavoriteRecipe(recipe: Recipe) {
    try {
      await api.addFavoriteRecipe(recipe);
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFavoriteRecipe(recipe: Recipe){
    try {
      await api.removeFavoriteRecipe(recipe);
      setFavoriteRecipes(favoriteRecipes.filter((favRecipe) => {favRecipe.id == recipe.id}));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="tabs">
        <h1
          onClick={() => {
            setSelectedTab("Search");
          }}
        >
          Receipe search
        </h1>

        <h1
          onClick={() => {
            setSelectedTab("Favorites");
          }}
        >
          Favorites
        </h1>
      </div>

      {selectedTab == "Search" ? (
        <>
          <div className="form">
            <input
              onChange={handleChange}
              type="text"
              name="searchTerm"
              id="searchTerm"
              placeholder="search recipe"
            />
            <button onClick={handleSubmit}>
              <AiOutlineSearch size={40} />
            </button>
          </div>
          <div className="recipe-grid">
            {recipes.map((recipe: Recipe) => {
              const isFavorite = favoriteRecipes.some((favRecipe) => favRecipe.id === recipe.id);

              return (<div onClick={() => handleSummary(String(recipe.id || ""))}>
                <Card
                isFavorite = {isFavorite}
                  onFavoriteButtonCLick={() => addFavoriteRecipe(recipe)}
                  recipe={recipe}
                />
              </div>);
            })}
          </div>

          <button onClick={handleViewMore}>view more</button>
        </>
      ) : null}

      {selectedTab == "Favorites" ? (
        <>
          <h1>This is favorites tab</h1>
          <div className="recipe-grid">
            {favoriteRecipes.map((recipe: Recipe) => (
              <div>
                <Card recipe={recipe} />
                <button onClick={() => handleSummary(String(recipe.id || ""))}>
                  summary
                </button>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {summaryToggle ? (
        <div>
          <RecipeModal handleSummary={handleSummary} recipeId={summaryToggle} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
