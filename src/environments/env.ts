import { DevEnvrionemnt } from "./dev.env";
import { ProdEnvrionemnt } from "./prod.env";
export interface Enviroments {
  db_url: string;
  login_time: number;
  auth_email: string;
  auth_password: string;
  base_url: string;
  result_time: number;
  
}
export function getEnvrionmentVariables() {
  if (process.env.NODE_ENV === "production") {
    return ProdEnvrionemnt;
  }
  return DevEnvrionemnt;
}
