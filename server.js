// Dependencies
// 
const express = require("express");
const path = require("path");
const fs = require("fs")
const uniqid = require("uniqid")
const app = express();
var PORT = process.env.PORT || 3000

// app to handle data parsing
// 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// 
app.get("/", function (req, res) {    
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.get("/notes", function (req, res) {    
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})
// api call for json data

app.get("/api/notes", function (req, res) {
    const note = pullData()
    res.json(note)
})

// Post notes from api
// 
app.post("/api/notes", function (req, res) {
    let noteJson = pullData();
    const newNote = req.body
    let id = uniqid()
    newNote.id = id
    noteJson.push(newNote)
    postData(noteJson)
    res.json(noteJson)
})

// Note deleter
// 
app.delete("/api/notes/:id", function (req, res) {
    const note = pullData();
    const result = note.filter(note => note.id != req.params.id)
    postData(result)
    res.json(result)
})

// write to JSON file
// 
const postData = function (data) {
    const dataRoute = path.join(__dirname, "/db.json")
    fs.writeFile(dataRoute, JSON.stringify(data), (err) => {
        if (err) throw err;
    })
}

const pullData = function () {
    const dataRoute = path.join(__dirname, "/db.json")
    const json = JSON.parse(fs.readFileSync(dataRoute))
    return json
}

// Listener and default route
// 


app.get("*", function (req, res) {    
    res.sendFile(path.join(__dirname, "/public/index.html"));
})


app.listen(PORT, function () {
    console.log("App listening on PORT")
}) 