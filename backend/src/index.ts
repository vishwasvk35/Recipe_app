import express from "express";
import cors from "cors";
import * as api from "./api-key";
import { PrismaClient } from "@prisma/client";

const app = express();
const prismaClient = new PrismaClient();
app.use((req, res, next) => {
    console.log("Request URL: ", req.url); // Log all incoming requests
    next();
});

app.use(express.json()); //convert the body of request and response into json
app.use(cors()); //used to avoid security related errors

app.get("/api/search", async (req, res) => {
  const searchTerm = req.query.searchTerm as string;
  const pageNo = parseInt(req.query.pageNo as string);

  const result = await api.searchRecipe(searchTerm, pageNo);
  console.log(result);
  res.send(result);
});

app.post("/api/recipe/favorite", async (req, res) => {
  const recipeId = req.body.recipeId; // Accessing the dynamic parameter

  try {
    // Your logic to fetch the recipe summary
    const favoriteRecipe = await prismaClient.favoriteRecipe.create({
      data: {
        RecipeId: recipeId,
      },
    });
    res.json(favoriteRecipe); // Sending the result as JSON
  } catch (error) {
    console.error("Error fetching recipe summary:", error);
    res.status(500).send({ error: "Failed to fetch recipe summary" });
  }
});

app.get("/api/recipe/favorite", async (req, res) => {
    console.log("index.ts");
  try {
    const recipe = await prismaClient.favoriteRecipe.findMany();
    const recipeIds: string[] = recipe.map((item) => {
      return item.RecipeId.toString();
    });
    const response = await api.favoriteRecipesById(recipeIds);
    console.log(response);
    res.send(response);
  } catch (error) {}
});



app.delete("/api/recipe/favorite", async (req, res) => {
  const recipeId = req.body.recipeId;

  try {
    await prismaClient.favoriteRecipe.delete({
      where: {
        RecipeId: recipeId,
      },
    });
    res.status(204).json(recipeId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "oops! something got wrong" });
  }
});

app.get("/test", (req, res) => {
  res.send("Test route working");
});

app.get("/api/recipe/:recipeId/summary", async (req, res) => {
  const recipeId = req.params.recipeId; // Accessing the dynamic parameter
  console.log(`Fetching summary for recipeId: ${recipeId}`);

  try {
    // Your logic to fetch the recipe summary
    const result = await api.summaryRecipe(recipeId);
    res.json(result); // Sending the result as JSON
  } catch (error) {
    console.error("Error fetching recipe summary:", error);
    res.status(500).send({ error: "Failed to fetch recipe summary" });
  }
});

app.listen(5000, () => {
  console.log("running on port: 5000");
});
