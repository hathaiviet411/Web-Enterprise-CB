import * as RequestApi from '../request';

export function getCategory(url, data) {
    return RequestApi.getAll(url, data);
}
