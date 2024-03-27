const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); 

const books = require("../data/books.json");
const users = require("../data/users.json");

const router = express.Router();

router.get("/books", (req, res) => {
    res.json(books);
});

router.get("/books/:id", (req, res) => {
    const id = req.params.id;
    const requestedBook = books.find(book => String(book.id) === id);
    res.json(requestedBook);
});

router.post("/books/:id", (req, res) => {
    const newComment = req.body;
    const id = req.params.id;
    const comment = { ...newComment, id: uuidv4(), likes: 0 };
    
    let book = books.find(book => String(book.id) === id);

    if (!book) {
        res.status(404).json({ message: "Book not found" });
        return;
    }

    book.comments.push(comment);

    fs.writeFile(path.join(__dirname, "../data/books.json"), JSON.stringify(books, null, 2), (err) => {
        if (err) {
            res.status(500).json({ message: "Error" });
            return;
        }
    })
    res.status(201).json(comment);
});

router.get("/users", (req, res) => {
    res.json(users);
});

router.post("/signup", (req, res) => {
    const formData = req.body;
    const user = { ...formData, id: uuidv4() };
    users.push(user);

    fs.writeFile(path.join(__dirname, "../data/users.json"), JSON.stringify(users, null, 2), (err) => {
        if (err) {
            res.status(500).json({ message: "Error with signing up. Try Again!" });
            return;
        }
    });
    res.status(201).json(user);
});

module.exports = router;
