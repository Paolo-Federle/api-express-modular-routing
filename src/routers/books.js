// Import data here...
const express = require("express")
const { books } = require("../../data.js")

const bookRouter = express.Router()


// Write routes here...

bookRouter.get("/", (req, res) => {
    res.json({ books })
})

bookRouter.post("/", (req, res) => {
    const newBook = { ...req.body, id: books[books.length - 1].id + 1 }
    if ((!req.body.title || !req.body.type || !req.body.author)) {
        return res.status(400).json({ error: "Missing fields in the request body" })
    }
    const searchBook = books.find((book) => book.title === req.body.title)
    if (searchBook) {
        return res.status(409).json({ error: "A book with the provided title already exists" });
    }
    books.push(newBook)
    res.json({ book: newBook })
})

bookRouter.get("/:id", (req, res) => {
    const searchBook = books.find((book) => book.id === Number(req.params.id))
    if (!searchBook) {
        return res.status(404).json({ error: "A book with the provided id already exists" })
    }
    res.json({ book: searchBook })
})

bookRouter.delete("/:id", (req, res) => {
    const searchBook = books.find((book) => book.id === Number(req.params.id));
    if (!searchBook) {
        return res.status(404).json({ error: "A book with the provided ID does not exist" })
    }
    books.splice(books.indexOf(searchBook), 1);
    res.json({ book: searchBook });
})


module.exports = bookRouter