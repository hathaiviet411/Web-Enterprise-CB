const User = require('../../models/user')
const Department = require('../../models/department')
const { cwd } = require("process");
const fs = require('fs');

const { parse } = require('json2csv');


function hasOwnProperty(ideas, data) {
    return ideas.map(async (idea, index) => {
        const user = await User.findOne({ _id: idea.user }).lean()
        const department = await Department.findOne({ _id: idea.department }).lean()
        idea.id = index;

        delete idea.user
        delete idea.ideaFile
        delete idea._id
        delete idea.__v;

        idea.category = data.name;
        idea.user = user.name;
        idea.department = department.departmentName
        idea.firstClosureDate = data.firstClosureDate;
        idea.finalClosureDate = data.finalClosureDate;

        delete user;
        delete department;

        return idea
    })
}

async function toCsv(data) {
    console.log(data);

    var fields = ['id', 'category', 'ideaTitle', 'ideaContent', 'viewCount', 'pointCount', 'isAnonymous', 'isDisabled', 'department', 'user', 'firstClosureDate', 'finalClosureDate', 'createdAt', 'updatedAt']
    const ops = { fields }
    var csv = parse(data, ops);

    const directoryPath = cwd()
    const slug = new Date().getFullYear()
    let file_name = `${slug}_${Date.now().toString()}.csv`

    const path = `${directoryPath}/public/csv/${file_name}`;
    fs.writeFile(path, csv, 'utf8', function (err, data) {
        if (err) { throw err; }
        return data
    });
    const response = `${process.env.BASE_URL}/csv/${file_name}`
    return response
}

module.exports = {
    hasOwnProperty,
    toCsv
}