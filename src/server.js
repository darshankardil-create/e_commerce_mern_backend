import express from "express";
import router from "./router.js";
import dotenv from "dotenv";
import { Mongodb } from "./Config/mongodb_config.js";
import cors from "cors";
import {ratelimiter} from "./middleware/ratelimiter.js"


dotenv.config();

const app = express();

Mongodb();

app.use(express.json());

app.use(
  cors({
    origin:[ "http://localhost:3001","https://darshankardil-create.github.io"] 
  })
);

app.use(ratelimiter)

app.use("/server", router);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("port live on ",PORT);
});



