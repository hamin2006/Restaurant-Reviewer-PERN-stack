require("dotenv").config();

const express = require("express");
const db = require("./db");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.listen(port, () => {
    console.log('server running on port ' + port);
});

app.get("/api/v1/restaurants", async (req,res) => {
    //Return list of restaurants from postgres
    try {
        const results = await db.query("select * from restaurants");
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            },
        });
    } catch (e) {
        console.log(e);
    }
    

});

app.get("/api/v1/restaurants/:id", (req,res) => {
    //Return single restaurant from postgres using id
});

app.post("/api/v1/restaurants", (req,res) => {
    //Create a restaurant
});

app.put("/api/v1/restaurants/:id", (req,res) => {
    //Update a restaurant
});

app.delete("/api/v1/restaurants/:id", (req,res) => {
    //Delete a restaurant
});

