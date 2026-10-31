
const express = require("express");

const app = express();

const PORT = 8000;


app.get("/", (req, res) => {
    res.send("Welcome to my Express.js Server!");
});


app.get("/about", (req, res) => {
    res.send("This is the About page.");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
