const multer = require('@koa/multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function(ctx, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: function(ctx, file, cb) {
        let type = file.originalname.split('.')[1];
        cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
    }
});
module.exports = multer({ storage });