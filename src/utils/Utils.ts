import * as axios from "axios";
import { getEnvrionmentVariables } from "../environments/env";
export class Utils {
  /**
   * Utils getRaceToken
   * This static method pass the user email,password and authnticate that.
   * @returns json
   */
  static async  getRaceToken() {
    const body = {
      email: `${getEnvrionmentVariables().auth_email}`,
      password: `${getEnvrionmentVariables().auth_password}`,
    };
    try {
      let obj = { token: null, message: "", status: 500 };
      const { data, status } = await axios.default({
        method: "post",
        url: `${getEnvrionmentVariables().base_url}/auth`,
        data: body,
      });
      if (status == 200)
        obj = {
          token: data?.token,
          message: "Successful authentication",
          status,
        };
      if (status == 401)
        obj = { token: "", message: "Invalid credentials", status };
      if (status == 503)
        obj = {
          token: "",
          message:
            "Server is busy. This will happen if too many users are logged in simultaneously. Wait and try again.",
          status,
        };
      return obj;
    } catch (e) {
      console.log("retry for token ");
      setTimeout(() => this.getRaceToken(), getEnvrionmentVariables().login_time);
    }
  }

  /**
   * Utils getRaceResult
   * This static mathod call the api with barerToken and return the race result.
   * @param barerToken:String
   * return json
   */
  static async getRaceResult(barerToken) {
    try {
      let raceinfo = { data: null, message: "", status: 500 };
      const { data, status }: any = await axios.default({
        method: "get",
        url: `${getEnvrionmentVariables().base_url}/results`,
        headers: {
          Authorization: `Bearer ${barerToken}`,
        },
      });
      if (status == 200)
        raceinfo = { data, message: "Successful request", status };
      if (status == 204) {
        setTimeout(() => this.getRaceResult(barerToken), getEnvrionmentVariables().result_time);
      }
      return raceinfo;
    } catch (error) {
      console.log("retry for event data ");
      setTimeout(() => this.getRaceResult(barerToken), getEnvrionmentVariables().result_time);
    }
  }
}