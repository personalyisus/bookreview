const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); 

const books = require("../data/books.json");
const users = require("../data/users.json");

const arrColors = ["#a855f7", "#1d4ed8", "#e11d48", "#22c55e", "#67e8f9", "#f472b6"];

function randomColor(arr) {
    return arrColors[Math.floor(Math.random() * arr.length)];
}

const router = express.Router();

router.get("/books", (req, res) => {
    res.json(books);
});

router.get("/books/:id", (req, res) => {
    const id = req.params.id;
    const requestedBook = books.find(book => book.id === id);
    res.json(requestedBook);
});

router.post("/books/:id", (req, res) => {
    const newComment = req.body;
    const id = req.params.id;
    const comment = { ...newComment, id: uuidv4(), likes: [] };
    
    let book = books.find(book => book.id === id);

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
    const user = { ...formData, id: uuidv4(), profileColor: randomColor(arrColors), token: false };
    users.push(user);

    fs.writeFile(path.join(__dirname, "../data/users.json"), JSON.stringify(users, null, 2), (err) => {
        if (err) {
            res.status(500).json({ message: "Error with signing up. Try Again!" });
            return;
        }
    });
    res.status(201).json(user);
});

router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    user.token = true;

    fs.writeFile(path.join(__dirname, "../data/users.json"), JSON.stringify(users, null, 2), (err) => {
        if (err) {
            res.status(500).json({ message: "Error with signing in! Check your email and password" });
            return;
        }
    });

    res.status(200).json(user);
});

router.post("/signout", (req, res) => {
    const { id } = req.body;
    const user = users.find(user => user.id === id);

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    user.token = false;

    fs.writeFile(path.join(__dirname, "../data/users.json"), JSON.stringify(users, null, 2), (err) => {
        if (err) {
            res.status(500).json({ message: "Error with signing out. Try again!" });
            return;
        }
    });

    res.status(200).json(user);
});

router.put("/books/:bookId/comments/:commentId", (req, res) => {
    const { bookId, commentId } = req.params;
    const { userId } = req.body;

    console.log(bookId, commentId, userId)

    let book = books.find(book => book.id === bookId);
    if (!book) {
        res.status(404).json({ message: "Book not found" });
        return;
    }

    let comment = book.comments.find(comment => comment.id === commentId);
    if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
    }

    const userAlreadyLiked = comment.likes.find(likeUserId => likeUserId === userId);
    comment.likes =  userAlreadyLiked ? comment.likes.filter(likeUserId => likeUserId !== userId) : comment.likes.concat(userId);


    fs.writeFile(path.join(__dirname, "../data/books.json"), JSON.stringify(books, null, 2), (err) => {
        if (err) {
            res.status(500).json({ message: "Error with updating the comment" });
            return;
        }
    });

    res.status(200).json(comment);

});

module.exports = router;
