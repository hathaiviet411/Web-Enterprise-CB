import * as RequestApi from '../request';

export function getRole(url, data) {
    return RequestApi.getAll(url, data);
}
