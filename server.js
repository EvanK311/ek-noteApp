
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

const app = express();
var PORT = process.env.PORT || 3000

// app to handle data parsing
// 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// retrieve json data from db.json file
// 
let dbData = fs.readFileSync(path.join(__dirname, "/db/db.json"), "utf8");
dbData = JSON.parse(dbData);

// Routes
// 
app.get("/index", function (req, res) {    
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.get("/notes", function (req, res) {    
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get("*", function (req, res) {    
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

// Listener
// 
app.listen(PORT, function () {
    console.log("App listening on PORT")
}) 