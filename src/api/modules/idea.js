import * as RequestApi from '../request';

export function getListIdea(url, data) {
    return RequestApi.getAll(url, data);
}

export function postIdea(url, data) {
    return RequestApi.postOne(url, data);
}
