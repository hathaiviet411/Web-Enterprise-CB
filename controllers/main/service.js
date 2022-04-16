const { parse } = require('json2csv');


const axios = require("axios");

const AdmZip = require('adm-zip');
const fs = require('fs');
const { cwd } = require("process");
const Category = require("../../models/category");
const Idea = require('../../models/idea');
const User = require('../../models/user');
const Department = require('../../models/department');


module.exports = {
    async downloadCsv(ctx) {

        let { category_id } = ctx.request.body
        const category = await Category.findOne({ _id: category_id }).lean()

        let ideas = await Idea.find({ category: category._id }).lean()
        const data = await Promise.all(ideas.map(async (idea, index) => {

            idea.id = index;

            const user = await User.findOne({ _id: idea.user }).lean()
            const department = await Department.findOne({ _id: idea.department }).lean()

            delete idea.user
            delete idea.ideaFile
            delete idea._id
            delete idea.__v;

            idea.category = category.categoryName;
            idea.user = user.name;
            idea.department = department.departmentName
            idea.firstClosureDate = category.firstClosureDate;
            idea.finalClosureDate = category.finalClosureDate;

            delete user;
            delete department;

            return idea
        }))

        var fields = ['id', 'category', 'ideaTitle', 'ideaContent', 'viewCount', 'pointCount', 'isAnonymous', 'isDisabled', 'department', 'user', 'firstClosureDate', 'finalClosureDate', 'createdAt', 'updatedAt']
        const ops = { fields }
        var csv = parse(data, ops);

        const directoryPath = cwd()

        const slug = new Date().getFullYear()

        let file_name = `${slug}_${Date.now().toString()}.csv`

        console.log(file_name);

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
        const zip = new AdmZip();

        const { path } = ctx.request.body;
        const slug = new Date().getFullYear()

        const file_name = `${slug}_${Date.now()}.zip`
        let index = 1

        for (let pathAPI of path) {

            let type = pathAPI.split('.')[1]


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
        ctx.body = response;
    }
}