import * as RequestApi from '../request';

export function getDepartment(url, data) {
    return RequestApi.getAll(url, data);
}

export function postDepartment(url, data) {
    return RequestApi.postOne(url, data);
}

export function deleteDepartment(url, Department_id) {
    return RequestApi.deleteOne(url, Department_id);
}
