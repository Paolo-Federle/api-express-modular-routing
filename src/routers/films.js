const express = require("express")
const { films } = require("../../data.js")

const filmRouter = express.Router()

filmRouter.get("/", (req, res) => {
    console.log("film is ", films)
    if (req.query.director) {
        const filteredFilmsByDirector = films.filter((film) =>
            film.director.includes(req.query.director)
        )
        if (filteredFilmsByDirector.length) {
            return res.json({ films: filteredFilmsByDirector })
        }
    }
    res.json({ films })
})

filmRouter.post("/", (req, res) => {
    const newfilm = { ...req.body, id: films[films.length - 1].id + 1 }
    if (!req.body.title || !req.body.director) {
        return res.status(400).json({ error: "Missing fields in request body" })
    }
    const searchTitle = films.find((film) => film.title === newfilm.title)
    if (searchTitle) {
        return res.status(409).json({ error: "A film with the provided title already exists" })
    }
    films.push(newfilm)
    res.json({ film: newfilm })
})

filmRouter.get("/:id", (req, res) => {
    const searchfilm = films.find((film) => film.id === Number(req.params.id))
    if (!searchfilm) {
        return res.status(404).json({ error: "A film with the provided id already exists" })
    }
    res.json({ film: searchfilm })
})

filmRouter.delete("/:id", (req, res) => {
    const searchfilm = films.find((film) => film.id === Number(req.params.id));
    if (!searchfilm) {
        return res.status(404).json({ error: "A film with the provided ID does not exist" })
    }
    films.splice(films.indexOf(searchfilm), 1);
    res.json({ film: searchfilm });
})

filmRouter.put("/:id", (req, res) => {
    const foundFilm = films.find((film) => film.id === Number(req.params.id));
    const foundTitle = films.find(
        (film) => film.title === req.body.title
    )

    if (!foundFilm) {
        return res.status(404).json({ error: "A film with the provided ID does not exist" });
    }

    if (foundTitle) {
        return res.status(409).json({ error: "A film with the provided title already exists" });
    }

    const updatedFilm = { ...req.body, id: Number(req.params.id) };
    films.splice(films.indexOf(foundFilm), 1, updatedFilm);
    res.json({ film: updatedFilm });
})

filmRouter.get("/:id", (req, res) => {
    const searchfilm = films.find((film) => film.id === Number(req.params.id))
    if (!searchfilm) {
        return res.status(404).json({ error: "A film with the provided id already exists" })
    }
    res.json({ film: searchfilm })
})



module.exports = filmRouter
