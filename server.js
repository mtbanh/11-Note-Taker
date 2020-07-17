const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('.journal.json')
c

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
    try{
        notesData = JSON.parse(notesData);

    }
    res.json(db)
})

//create route that takes user to index.html
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"))
});

//create route that reads the db.json file and return notes as JSON
app.get("", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"))
});
//POST '/api/notes'