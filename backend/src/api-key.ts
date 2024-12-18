import { query } from "express";
import * as dotenv from 'dotenv'; //used to fetch apikey from .env
dotenv.config();

const apiKey = process.env.API_KEY;

async function searchRecipe(searchTerm: string, pageNo: number) {
    if (!apiKey) {
        throw new Error("No API key");
    }

    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

    const queryParams = {
        apiKey: apiKey,
        query: searchTerm,
        number: "10", // Number of recipes per page
        offset: ((pageNo - 1) * 10).toString() // Dynamically calculate the offset
    };

    url.search = new URLSearchParams(queryParams).toString();

    try {
        const searchResponse = await fetch(url.toString());
        const resultJson = await searchResponse.json();
        return resultJson;
    } catch (error) {
        console.error("Error during API call:", error);
    }
}

export default searchRecipe;