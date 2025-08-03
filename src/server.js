import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import { and, eq } from "drizzle-orm";
import job from "./config/cron.js";

const app = express()
const PORT = ENV.PORT;

if (ENV.NODE_ENV === "production") job.start();

app.use(express.json()); //this enables the server to have a body parser middleware which enables 
//the server to parse JSON in the body of incoming requests and makes it available as req.body

app.get('/api/health', (req, res)=> {
    res.status(200).json({success:true});
});

app.post('/api/favorites', async (req, res) =>{
  try{
    const { userId, recipeId, title, image, cookTime, servings} = req.body;

    if(!userId || !recipeId || !title){
      return res.status(400).json({error: "Missing required fields"})
    }

    const favoriteAdded = await db.insert(favoritesTable).values({
      userId,
      recipeId,
      title,
      image,
      cookTime,
      servings
    }).returning(); // if you don't add any parameters in returning(), it will return all the feilds

    return res.status(201).json(favoriteAdded[0]);
  }
  catch(error){
    console.log("Error adding the favorite", error);
    res.status(500).json({
      error:"Something went wrong from the server"
    });
  }
})

app.delete('/api/favorites/:userId/:recipeId', async(req, res) => {     //:userId, :recipeId are instance values that will be given as parameters in the web link
  try{
    const {userId, recipeId} = req.params;

    await db.delete(favoritesTable).where(
      and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeId, parseInt(recipeId)))        //and is used to as logical AND eq is used as eqauls, and we are checking the favoritesTable.userId in the DB with the instance value userID
    );

    res.status(200).json({message : "Favorite removed successfully"})
  }
  catch(error){
    console.log("Error in deleting your favorite", error);
    res.status(500).json({error: "Something went wrong in deleting favorite"})
  }
})

app.get('/api/favorites/:userId', async(req, res) => {
  try{
    const {userId} = req.params;

    const userFavoritesList = await db.select().from(favoritesTable).where(eq(favoritesTable.userId, userId));

    res.status(200).json(userFavoritesList);
  }
  catch(error){
    console.log('Error in fetching the favorites list');
    res.status(500).json({error : "Error in fetching the favorites"})
  }
})

console.log(PORT);
console.time("startup");
app.listen(PORT, () =>{
    console.timeEnd("startup");
    console.log("Server is running at Port: ", PORT);
});