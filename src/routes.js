const crypto = require('crypto');
const dbHelper = require('./mongo');

module.exports = {
    default: (req, res) => {
        res.sendFile('/static/index.html', {
            root: '.'
        });
    },

    upload: (req, res, db) => {
        console.log(req.body)
        let userID = crypto.randomBytes(20).toString('hex');
        dbHelper.insertFile(db, {
            path: req.file.path,
            user: req.body.name,
            user_id: userID,
            date: new Date().getTime()
        });
        
        res.send('Uploaded');
    }
}