module.exports = {
    insertFile: (db, file) => {
        db.collection('files').insertOne(file, (err, res) => {
            if (err) console.error(err);
            console.log("Inserted a file document");
        })
    }
}