
// TODO: create a connection to /notes page
//TODO: 'get started' button will take you to notes.html page.

//TODO: create GET `/api/notes` to read db.json file to return saved notes from db.json
//TODO: POST `/api/notes` should receive new note to save 
//TODO: DELETE `/api/notes/:id` will delete the note containing the ID given. 


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
    let note = pullData();
    const newNote = req.body
    let id = uniqid()
    newNote.id = id
    note.push(newNote)
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
    const json = JSON.parse(fs.readFileSync(jsonPath))
    return json
}

// function getNoteData() {
//     let dbData = fs.readFileSync(path.join(__dirname, "/db.json"), "utf8");
//     dbData = JSON.parse(dbData);

//     let noteData = dbData.noteData
//     console.log(noteData)
//     return noteData
// }

// app.get("api/notes", function (req, res) {
    // res.json(getNoteData());
// })




// Listener and default route
// 
app.get("*", function (req, res) {    
    res.sendFile(path.join(__dirname, "/public/index.html"));
})


app.listen(PORT, function () {
    console.log("App listening on PORT")
}) 