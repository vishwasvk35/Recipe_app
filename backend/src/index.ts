import express from 'express';
import cors from 'cors'

const app = express();

app.use(express.json()); //convert the body of request and response into json
app.use(cors()); //used to avoid security related errors

app.get('/api/search', (req, res) => {
    res.send('Server is working!');
}); //test code to check if everything is working properly

app.listen(5000, ()=>{
    console.log("running on port: 5000");
})