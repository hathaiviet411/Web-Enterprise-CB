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

const limits = {
    fileSize: 5000000, //File Size Unit
}

const fileFilter = (ctx, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Image error'))
    }
    // Only allow images pass
    cb(null, true);
}

module.exports = multer({ storage, limits,  });