import * as express from "express";
import * as mongoose from "mongoose";
import { getEnvrionmentVariables } from "./environments/env";

import RaceRouter from "./routers/RaceRouter";


export class Server {
  public app: express.Application = express();
  constructor() {
    this.setConfigurations();
    this.setRoutes();
    this.error404Handeler();
    this.hendelErrors();
  }

  setConfigurations() {
    this.connectMongoDB();
   
  }

  connectMongoDB() {
    mongoose.connect(getEnvrionmentVariables().db_url,{
    bufferCommands:true,
    autoIndex: true,
    }).then(() => {
      console.log("mongodb connected");
    });
  }
  setRoutes() {
    this.app.use("/api/race", RaceRouter);
  }
  error404Handeler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: "Not Found",
        status_code: 404,
      });
    });
  }

  hendelErrors() {
    this.app.use((error, req, res, next) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message || "Something went wrong, Please Try Again",
        status_code: errorStatus,
      });
    });
  }
}
