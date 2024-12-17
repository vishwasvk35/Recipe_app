import express from 'express';
import cors from 'cors'
import searchRecipe from './api-key';

const app = express();

app.use(express.json()); //convert the body of request and response into json
app.use(cors()); //used to avoid security related errors

app.get('/api/search', async (req, res) => {
    const searchTerm = req.query.searchTerm as string
    const pageNo = parseInt(req.query.pageNo as string)

    const result = await searchRecipe(searchTerm, pageNo);
    console.log(result);
    res.send(result);
}); //test code to check if everything is working properly

app.listen(5000, ()=>{
    console.log("running on port: 5000");
})