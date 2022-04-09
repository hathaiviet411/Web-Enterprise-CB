import * as RequestApi from '../request';

// export function getAllDislike(url, data) {
//     return RequestApi.getAll(url, data);
// }

// export function getOneDislike(url, data) {
//     return RequestApi.getOne(url, data);
// }

export function postDislike(url, data) {
    return RequestApi.postOne(url, data);
}

export function deleteDislike(url, data) {
    return RequestApi.deleteOne(url, data);
}

