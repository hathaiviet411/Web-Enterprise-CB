const { parse } = require('json2csv');


const axios = require("axios");

const AdmZip = require('adm-zip');
const { saveAs } = require('file-saver');
const mime = require('mime-types')
const fs = require('fs');
const { cwd } = require("process");
const Category = require("../../models/category");


module.exports = {
    generatedZip() {

    },

    generatedCsv() {

    },

    async downloadCsv(ctx) {
        let data = await Category.find({}).lean()

        for (element of data) {
            let index = 0
            delete element._v
            element._id = index
            index++
        }

        var fields = ['categoryName', 'startDate', 'firstClosureDate', 'finalClosureDate', 'isDisabled', 'createdAt', 'updatedAt']
        const ops = { fields }
        var csv = parse(data, ops);

        const directoryPath = cwd()

        const slug = new Date().getFullYear()

        let file_name = `${slug}_${Date.now()}.csv`

        var path = `${directoryPath}/public/csv/${file_name}`;
        fs.writeFile(path, csv, 'utf8', function (err, data) {
            if (err) { throw err; }
            return data
        });

        const response = fs.createReadStream(path);
        ctx.response.set("content-type", 'text/csv');
        ctx.response.set("content-disposition", `attachment; filename=${file_name}`);
        ctx.body = response;
    },

    async downloadZip(ctx) {
         const { path } = ctx.request.body;

        const slug = new Date().getFullYear()

        let file_name = `${slug}_${Date.now()}.zip`

        const zip = new AdmZip();

        const url = `http://localhost:8000/uploads/${path}`;
        const body = await axios.get(url, {
            responseType: 'arraybuffer'
        });
        const data = body.data;

        zip.addFile(`item`, Buffer.from(data, "utf8"), "download zip folder", 0644 << 16)
        zip.toBuffer()
        zip.writeZip(`public/zip/${file_name}`)

        const directoryPath = cwd()

        var pathZip = `${directoryPath}/public/zip/${file_name}`;
        const response = fs.createReadStream(pathZip);
        ctx.response.set("content-type", 'application/zip');
        ctx.response.set("content-disposition", `attachment; filename=${file_name}`);
        ctx.body = response;
    }
}