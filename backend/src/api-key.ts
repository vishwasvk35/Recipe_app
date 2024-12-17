import { query } from "express";
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;

async function searchRecipe(searchTerm: string, pageNo: number) {
    if(!apiKey){
        throw new Error("no API key");
    }

    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

    const queryParams = {
        apiKey: apiKey,
        query: searchTerm,
        number: "10",
        offest: (pageNo * 10).toString() //each page contains 10 recipes
    }

    url.search = new URLSearchParams(queryParams).toString();

    try {
        const searchResponse = await fetch(url);
        const resultJson = await searchResponse.json();
        return resultJson;
    } catch (error) {
        
    }
}

export default searchRecipe;