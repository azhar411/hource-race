import HourceRace from "../models/hourcerace";
import { Utils } from "../utils/Utils";
export class RaceController {

  /**
   * RaceController static method runHourceRace
   * This mehtod authanticate and pass token for hource data.
   */
  static async runHourceRace() {
    let timer: any = 0;
    clearInterval(timer);
    let auth = await Utils.getRaceToken();
    if (auth?.token) {
      timer = RaceController.getHourceRaceResult(auth?.token);
    }
  }

  /**
   * RaceController static method getHourceRaceResult
   * This mehtod get the race result and store into database.
   * @param token : String
   */
  static async getHourceRaceResult(token) {
    let { data, message }: any = await Utils.getRaceResult(token);
    if (data) {
      //await new HourceRace(data).save();
      await HourceRace.insertMany(data);
      console.log(message);
      await this.getHourceRaceResult(token);
    } else {
      this.runHourceRace();
    }
  }
}
