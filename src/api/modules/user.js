import * as RequestApi from '../request';

export function getUser(url, data) {
    return RequestApi.getAll(url, data);
}

export function postUser(url, data) {
    return RequestApi.postOne(url, data);
}

export function putUser(url, data) {
    return RequestApi.putOne(url, data);
}

export function deleteUser(url, User_id) {
    return RequestApi.deleteOne(url, User_id);
}
