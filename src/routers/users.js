const express = require("express")
const { users } = require("../../data.js")

const userRouter = express.Router()

userRouter.get("/", (req, res) => {
    console.log("users are ", users)
    res.json({ users })
})

userRouter.post("/", (req, res) => {
    const newUser = { ...req.body, id: users[users.length - 1].id + 1 }
    if (!req.body.email) {
        return res.status(400).json({ error: "Missing fields in request body" })
    }
    const searchMail = users.find((user) => user.email === newUser.email)
    if (searchMail) {
        return res.status(409).json({ error: "A user with the provided email already exists" })
    }
    users.push(newUser);
    res.json({ user: newUser });
})

userRouter.get("/:id", (req, res) => {
    const searchUser = users.find((user) => user.id === Number(req.params.id))
    if (!searchUser) {
        return res.status(404).json({ error: "A user with the provided email already exists" })
    }
    res.json({ user: searchUser });
})

userRouter.delete("/:id", (req, res) => {
    const searchUser = users.find((user) => user.id === Number(req.params.id));
    if (!searchUser) {
        return res.status(404).json({ error: "A user with the provided ID does not exist" });
    }
    users.splice(users.indexOf(searchUser), 1);
    res.json({ user: searchUser });
})

userRouter.put("/:id", (req, res) => {
    const foundUser = users.find((user) => user.id === Number(req.params.id));
    const foundEmail = users.find((user) => user.email === req.body.email);

    if (!foundUser) {
        return res
            .status(404)
            .json({ error: "A user with the provided ID does not exist" });
    }

    if (foundEmail) {
        return res
            .status(409)
            .json({ error: "A user with the provided email already exists" });
    }
})



module.exports = userRouter
