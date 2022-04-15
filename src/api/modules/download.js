import * as RequestApi from '../request';

export function postDownloadZip(url, data) {
    return RequestApi.postOne(url, data);
}

export function postDownloadCsv(url, data) {
    return RequestApi.postOne(url, data);
}
