import { ENV } from './src/config/env.js';

export default {
    schema : "./src/db/schema.js",
    out : "./src/db/migrations",   //the code in schema for creating table is in JS code, so we need to
    //convert into SQL and we will npx drizzle-kit generate to convert the js table schema into SQL tables
    dialect : "postgresql",
    dbCredentials : { url : ENV.DATABASE_URL },
};