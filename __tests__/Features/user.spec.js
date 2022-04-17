const { default: axios } = require("axios");

let url = 'http://localhost:8000/api/user'
axios.get(url, {
    headers: {
        Authorization: 'Bearer JFKBSLAFBUIDSFJDSFS.FSDFBSKJDBFSD'
    }
})

axios.post(url, {
    data: {},
    headers: {
        Authorization: 'Bearer JFKBSLAFBUIDSFJDSFS.FSDFBSKJDBFSD'
    }
})

axios.put(url, {
    data: {},
    headers: {
        Authorization: 'Bearer JFKBSLAFBUIDSFJDSFS.FSDFBSKJDBFSD'
    }
})

axios.delete(url, {
    data: {},
    headers: {
        Authorization: 'Bearer JFKBSLAFBUIDSFJDSFS.FSDFBSKJDBFSD'
    }
})

//expect