const crypto = require('crypto');
const dbHelper = require('./mongo');
const { mkdirSync, renameSync } = require('fs');
const settings = require('../settings.json');

module.exports = {
    default: (req, res) => {
        res.sendFile('/static/index.html', {
            root: '.'
        });
    },

    upload: (req, res, db) => {
        console.log(req.file)
        let userID = crypto.randomBytes(20).toString('hex');
        let name = 'Anonymous';
        if (req.body.name) name = req.body.name;
        let obj = {
            path: mkdirAndMove(req.file, userID),
            user: name,
            user_id: userID,
            date: new Date().getTime()
        }
        dbHelper.insertFile(db, obj);
        
        let cdnUrl = `${settings.cdn_uri}/${userID}/${req.file.originalname.replace(/ +(?= )/g,'')}`

        res.render('uploaded', {
            name: name,
            url: cdnUrl
        })
    },

    static: (req, res) => {
        file = req.url.split('/static/')[1];
        res.sendFile(file, {
            root: 'static'
        });
    }
}

function mkdirAndMove(file, userID) {
    let newPath = `${settings.upload}/${userID}`
    let newName = file.originalname.replace(/ +(?= )/g,'');
    mkdirSync(newPath, err => err ? console.error(err): console.log('Directory created'));
    renameSync(file.path, `${newPath}/${newName}`, err => err ? console.error(err) : console.log('Moved succesfully'));
    return newPath + "/" + newName;
}