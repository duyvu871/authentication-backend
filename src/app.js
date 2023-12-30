import Loaders from "./loaders/index.js";
import express from "express";
import AppConfig from "./configs/app.config.js";
import testCron from "./cron.js";

async function startServer() {
    const app = express();
    await Loaders({ expressApp: app });
    // app.get("/cron-job/test", testCron);
    app.listen(AppConfig.port, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Server run in URL: http://localhost:${AppConfig.port}`)
        // console.log(`Your server is ready ! in port ${process.env.PORT}`);
    });
}

startServer();