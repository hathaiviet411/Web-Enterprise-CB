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

        console.log(data);

        // const json2csv = new Parser()


        var fields = ['categoryName', 'startDate', 'firstClosureDate', 'finalClosureDate', 'isDisabled', 'createdAt', 'updatedAt']

        const ops = { fields }
        var csv = parse(data, ops);

        const directoryPath = cwd()

        let file_name = `${Date.now()}.csv`

        var path = `${directoryPath}/public/csv/${file_name}`;
        fs.writeFile(path, csv, 'utf8', function (err, data) {
            if (err) { throw err; }
            console.log('Created a new csv file.')
            return data
        });

        const src = fs.createReadStream(path);
        ctx.response.set("content-type", 'text/csv');
        ctx.response.set("content-disposition", `attachment; filename=${file_name}`);
        ctx.body = src;
    },

    async downloadZip(ctx) {
        // const { path } = ctx.request.body;
        const path = '276270758_3862731587343623_2010198310967369279_n-17fc548c9e3.png'

        const zip = new AdmZip();

        const url = `http://localhost:8000/uploads/${path}`;
        const body = await axios.get(url, {
            responseType: 'arraybuffer'
        });
        const data = body.data;

        zip.addFile('item', Buffer.from(data, "utf8"), "download zip folder", 0644 << 16)
        zip.toBuffer()
        zip.writeZip("public/zip/item.zip")

        const directoryPath = cwd()

        var pathZip = `${directoryPath}/public/zip/item.zip`;
        var mimeType = mime.lookup(pathZip);
        const src = fs.createReadStream(pathZip);
        ctx.response.set("content-type", mimeType);
        ctx.response.set("content-disposition", "attachment; filename=item.zip");
        ctx.body = src;
    }
}