const app = require('express')();
const settings = require('../settings.json');
const { MongoClient } = require('mongodb');
const pug = require('pug');
let mongo = undefined;
let db = undefined;

app.set('view engine', 'pug');
const routes = require('./routes');

// Upload
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, settings.upload)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });


// Routes
app.get('/', routes.default);
app.post('/upload', upload.single('file'), (req, res) => routes.upload(req, res, db))
app.get('/static/*', routes.static);


// Initializer
app.listen(settings.port, async () => {
    console.log(`Listening on http://localhost:${settings.port}`);
    // Database
    mongo = new MongoClient(settings.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    try {
        await mongo.connect();
    } catch (e) {
        console.error(e);
    }
    db = mongo.db('file-upload');
});

// Shutdown hook
process.on('exit', async () => {
    await mongo.close();
})