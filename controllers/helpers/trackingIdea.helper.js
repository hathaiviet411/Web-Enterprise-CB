const Idea = require("../../models/idea");

function convertDate(params) {
    const time = new Date(params);
    return {
        year: time.getFullYear(),
        month: time.getMonth(),
        date: time.getDate(),
    };
}

async function closeIdea(idea) {
    await Idea.updateOne({ _id: idea._id }, { isDisabled: true })
    return;
}

async function isClose(opened_time, close_date, idea_id) {
    const idea = Idea.findOne({ _id: idea_id });
    if (close_date <= opened_time) {
        await closeIdea(idea);
        return true;
    }
    return false;
}


module.exports = {
    checkIfCloseIdea: async (created_at, idea_id) => {
        const time = convertDate(created_at);

        let year = time.year;
        let month = time.month;
        let date = time.date;
        let close_date = new Date(created_at);

        close_date.setDate(close_date.getDate() + 30);

        let closed_time = close_date.getTime();
        let opened_time = new Date(year, month, date).getTime();
        return isClose(opened_time, closed_time, idea_id);
    },

    checkIfCloseIdea: async (created_at, idea_id) => {
        const time = convertDate(created_at);

        let year = time.year;
        let month = time.month;
        let date = time.date;
        let close_date = new Date(created_at);

        close_date.setDate(close_date.getDate() + 30);

        let closed_time = close_date.getTime();
        let opened_time = new Date(year, month, date).getTime();
        return isClose(opened_time, closed_time, idea_id);
    },
};
