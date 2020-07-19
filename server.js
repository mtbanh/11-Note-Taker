const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./journal.json')
// const util = require('util');
// const { networkInterfaces } = require('os');
// const writeFileSync = util.promisify(fs.writeFile)
// const readFileSync = util.promisify(fs.readFile)

const app = express();

const PORT = process.env.PORT || 8080;

const mainDirectory = path.join(__dirname, "/public")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// let notesData = [];

//ROUTES

//create route that takes user to notes.html
app.get("/notes", (req, res)=>{
    res.sendFile(path.join(mainDirectory, "notes.html"))
});

app.get("/api/notes", (req, res)=>{
    // notesData=fs.readFileAsync("/db/db.json", "utf-8");
    // notesData=JSON.parse(notesData);
    // res.json(notesData);
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("api/notes/:id", (req, res) =>{
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    res.json(savedNotes[Number(req.params.id)])
})

//create route that takes user to index.html
app.get("*", (req, res)=>{
    res.sendFile(path.join(mainDirectory, "index.html"))
});

//POST '/api/notes'

app.post("/api/notes", (req, res) =>{
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let newNote = req.body;
    let ID = (savedNotes.length).toString();
    newNote.id = ID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})

app.delete("api/notes/:id", (req, res) =>{
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let noteID = req.params.id;
    let newID =0;
    savedNotes = savedNotes.filter(currentNote =>{
        return currentNote.id != noteID;
    })

    for (currentNote of savedNotes){
        currentNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`);
})