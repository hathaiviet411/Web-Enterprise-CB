const json2csv = require('json2csv').parse;


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

    async downloadZip(ctx) {
        const data = await Category.find({}).lean()

        // const json2csv = new Parser()

        var fields = ['categoryName', 'startDate', 'firstClosureDate', 'finalClosureDate', 'isDisabled', 'createdAt', 'updatedAt']
        var csv = json2csv({ data: data, fields: fields });

        console.log(csv);
        const pZip = cwd()

        let file_name = `${Date.now()}.csv`

        var path = `${pZip}/public/csv/${file_name}`;
        fs.writeFile(path, csv, 'utf8', function (err, data) {
            if (err) { throw err; }
        });

        ctx.attachment(path)

        // var mimeType = mime.lookup(path);
        // const src = fs.createReadStream(path);
        // ctx.response.set("content-type", mimeType);
        // ctx.response.set(`content-disposition", "attachment; filename=item.csv`);
        // ctx.body = src;
    },

    async downloadCsv(ctx) {
        // const { path } = ctx.request.body;
        const path = '276270758_3862731587343623_2010198310967369279_n-17fc548c9e3.png'

        const zip = new AdmZip();

        const url = `http://localhost:8000/uploads/${path}`;
        const body = await axios.get(url, {
            responseType: 'arraybuffer'
        });
        const data = body.data;
        console.log(data);

        zip.addFile('item', Buffer.from(data, "utf8"), "download zip folder")
        // zip.toBuffer()
        zip.writeZip("public/zip/item.zip")

        const pZip = cwd()

        var pathZip = `${pZip}/public/zip/item.zip`;
        var mimeType = mime.lookup(pathZip);
        const src = fs.createReadStream(pathZip);
        ctx.response.set("content-type", mimeType);
        ctx.response.set("content-disposition", "attachment; filename=idea.zip");
        ctx.body = src;
    }
}