import Cookies from "js-cookie";
import constAuth from "@/const/auth";

/**
 * Function get Object Profile in Cookies
 * @returns Return Object Profile
 */
export function getProfile() {
  let PROFILE = Cookies.get("profile");

  if (PROFILE) {
    return JSON.parse(PROFILE);
  }

  PROFILE = constAuth.PROFILE;

  return PROFILE;
}
