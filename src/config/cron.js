import cron from "cron";
import https from "https";

// We are defining a CRON job because we the 3rd party Deployment service that we are using becomes inactive once the web service that we built didn't get any request for 15 minutes. So to again make the web service active,
//it takes roughly 50 seconds and we need more time to get a response, so we are adding a CRON job to make sure that the service is not active

const job = new cron.CronJob("*/14 * * * *", function(){
    https.get(process.env.API_URL, (res) =>{
        if(res.statusCode === 200 ) console.log("GET request sent successfully");
        else console.log("GET request failed ", res.statusCode);
    })
    .on("error", (e) => console.log("Error while sending request ", e));
});

// */14 * * * *, here it is MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK

export default job;

//EXAMPLES AND EXPLANATIONS
//* 14 * * * * - EVERY 14 MINUTES
//* 0 0 * * 0 - AT MODNIGHT ON EVERY SUNDay
//* 20 3 15 * * - At 3:30Am, on the 15th of EVERY MONTH
//* 0 0 1 1 * - AT MIDNIGHT, ON JAN 1ST
//* 0 * * * * - EVERY HOUR

