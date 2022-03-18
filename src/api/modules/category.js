import * as RequestApi from '../request';

export function getCategory(url, data) {
    return RequestApi.getAll(url, data);
}

export function deleteCategory(url, category_id) {
    return RequestApi.deleteOne(url, category_id);
}
