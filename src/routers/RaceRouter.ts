import { Router } from "express";
import { RaceController } from "../controllers/RaceController";
class RaceRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
  }
  getRoutes() {
    this.router.get("/", (req, res) => {
      res.json({ message: "Welcome to Hource Race!!" });
    });
    this.router.get("/start", RaceController.runHourceRace);
  }
}

export default new RaceRouter().router;
