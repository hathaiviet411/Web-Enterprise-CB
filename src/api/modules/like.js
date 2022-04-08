import * as RequestApi from "../request";

// export function getAllLike(url, data) {
//     return RequestApi.getAll(url, data);
// }

// export function getOneLike(url, data) {
//     return RequestApi.getOne(url, data);
// }

export function postLike(url, data) {
  return RequestApi.postOne(url, data);
}

export function deleteLike(url, data) {
  return RequestApi.deleteOne(url, data);
}
