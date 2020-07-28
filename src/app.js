const app = require('express')();
const settings = require('../settings.json');

app.get('/', (req, res) => {
    res.send('oof');
})

app.listen(settings.port, () => console.log(`Listening on http://localhost:${settings.port}`));