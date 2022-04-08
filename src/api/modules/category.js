import * as RequestApi from "../request";

export function getCategory(url, data) {
  return RequestApi.getAll(url, data);
}

export function postCategory(url, data) {
  return RequestApi.postOne(url, data);
}

export function putCategory(url, data) {
  return RequestApi.putOne(url, data);
}

export function deleteCategory(url, category_id) {
  return RequestApi.deleteOne(url, category_id);
}
