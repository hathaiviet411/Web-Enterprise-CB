
const service = require('../helpers/download.helper')
const axios = require("axios");
const { cwd } = require("process");
const fs = require('fs');

const AdmZip = require('adm-zip');
const Category = require("../../models/category");
const Idea = require('../../models/idea');

async function getIdeaFromCategory(_id) {
    const category = await Category.findOne({ _id }).lean()

    const ideas = await Idea.find({ category: category._id }).lean()

    const ops = {
        name: category.categoryName,
        firstClosureDate: category.firstClosureDate,
        finalClosureDate: category.finalClosureDate
    }

    const data = await Promise.all(await service.hasOwnProperty(ideas, ops))

    return data
}


module.exports = {
    async downloadCsv(ctx) {
        let { category_id } = ctx.request.body

        const data = await getIdeaFromCategory(category_id)

        const response = await service.toCsv(data)

        ctx.response.set("content-type", 'text/csv');
        ctx.body = response;
    },

    async downloadZip(ctx) {
        const zip = new AdmZip();

        const { path } = ctx.request.body;
        const slug = new Date().getFullYear()

        const file_name = `${slug}_${Date.now()}.zip`
        let index = 1

        for (let pathAPI of path) {

            let p = pathAPI.split('.');

            let type = p[p.length - 1];


            const url = pathAPI
            const body = await axios.get(url, {
                responseType: 'arraybuffer'
            });
            const data = body.data;
            await zip.addFile(`attachment_${index}.${type}`, Buffer.from(data, "utf8"), "", 0644 << 16)
            index++
        }

        zip.toBuffer();
        zip.writeZip(`public/zip/${file_name}`)

        const directoryPath = cwd()

        var pathZip = `${directoryPath}/public/zip/${file_name}`;
        const response = fs.createReadStream(pathZip);
        ctx.response.set("content-type", 'application/zip');
        ctx.response.set("content-disposition", `attachment; filename=${file_name}`);
        const downloadUrl = `${process.env.BASE_URL}/zip/${file_name}`
        console.log(downloadUrl);
        ctx.body = downloadUrl;
    }
}