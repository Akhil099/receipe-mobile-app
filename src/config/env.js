import "dotenv/config";   //without importing this file the process.env.PORT will be not taking the value in .env file and it "process.env.PORT" will be undefined

console.log("ENV loading...");
export const ENV = {
    PORT: process.env.PORT || 5001, //Start in port mentioned in dev and if not defined define port number as the default port number as 5001
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV:process.env.NODE_ENV
};
console.log("ENV loaded:", ENV);