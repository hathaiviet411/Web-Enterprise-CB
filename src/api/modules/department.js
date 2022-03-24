import * as RequestApi from '../request';

export function getDepartment(url, data) {
    return RequestApi.getAll(url, data);
}
