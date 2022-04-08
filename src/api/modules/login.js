import * as RequestApi from "../request";

export function postLogin(url, data) {
  return RequestApi.postOne(url, data);
}

export function getInfo(url, data) {
  return RequestApi.postOne(url, data);
}
