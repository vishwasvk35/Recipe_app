import express from 'express';
import cors from 'cors'
import * as api from './api-key';

const app = express();

app.use(express.json()); //convert the body of request and response into json
app.use(cors()); //used to avoid security related errors

app.get('/api/search', async (req, res) => {
    const searchTerm = req.query.searchTerm as string
    const pageNo = parseInt(req.query.pageNo as string)

    const result = await api.searchRecipe(searchTerm, pageNo);
    console.log(result);
    res.send(result);
});

app.get('/api/recipe/:recipeId/summary', async (req, res) => {
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



app.listen(5000, ()=>{
    console.log("running on port: 5000");
})