const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('.journal.json')
const util = require('util');
const { networkInterfaces } = require('os');
const writeFileAsync = util.promisify(fs.writeFile)
const readFileAsync = util.promisify(fs.readFile)

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname + 'public')));

let notesData = [];

//ROUTES

//create route that takes user to notes.html
app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("/api/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "/db/db.json"));
})

app.get("api/notes/:id", (req, res) =>{
    let savedNotes = JSON.parse(fs.readFileAsync("./db/db.json", "utf-8"));
    res.json(savedNotes[Number(req.params.id)])
})

//create route that takes user to index.html
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"))
});

//POST '/api/notes'

app.post("/api/notes", (req, res) =>{
    let savedNotes = JSON.parse(fs.readFileAsync("./db/db.json", "utf-8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);
})