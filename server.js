const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let notesData = [];

//ROUTES

//create route that takes user to notes.html
app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "notes.html"))
});

//create route that takes user to index.html
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"))
});

//create route that reads the db.json file and return notes as JSON

//POST '/api/notes'