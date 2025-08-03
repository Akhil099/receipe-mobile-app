import { pgTable, serial, text, timestamp, integer} from "drizzle-orm/pg-core";

//drizzle-orm package is used to communicating with the DB like connecting to DB, adding to data to 
// DB, deleting data from table, manipulating data on the dB
//we use the drizzle-kit to apply our changes from the local file to the actual file, we use drizzle-kit

export const favoritesTable = pgTable("favorites", {
    id:serial("id").primaryKey(),
    userId: text("user_id").notNull(),  //camelCase is used in 'userId' because it is used in js code, where
    //snake case is used in 'user_id' because we will be using it in the db
    recipeId : integer("recipe_id").notNull(),
    title : text("title").notNull(),
    image : text("image"),
    cookTime : text("cook_time"),
    servings : text("servings"),
    createdAt : timestamp("created_at").defaultNow(),
}) 
