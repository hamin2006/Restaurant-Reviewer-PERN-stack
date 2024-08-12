require("dotenv").config();

const express = require("express");
const db = require("./db");
const app = express();
const port = process.env.PORT;

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

app.get("/api/v1/restaurants/:id", async (req,res) => {
    //Return single restaurant from postgres using id
    try {
        const results = await db.query("select * from restaurants where id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurants: results.rows[0]
            },
        });
    } catch (e) {
        console.log(e);
    }
});

app.post("/api/v1/restaurants", async (req,res) => {
    //Create a restaurant
    try {
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", 
            [req.body.name, req.body.location, req.body.price]);
        res.status(201).json({
            status: "success",
            data: {
                restaurants: results.rows[0],
            }
        });
    } catch (e) {
        console.log(e);
    }
});

app.put("/api/v1/restaurants/:id", async (req,res) => {
    //Update a restaurant
    try {
        const results = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", 
            [req.body.name, req.body.location, req.body.price, req.params.id]);
        res.status(201).json({
            status: "success",
            data: {
                restaurants: results.rows[0],
            }
        });
    } catch (e) {
        console.log(e);
    }
});

app.delete("/api/v1/restaurants/:id", async (req,res) => {
    //Delete a restaurant
    try {
        const results = await db.query(
            "DELETE FROM restaurants where id = $1", 
            [req.params.id]);
        res.status(204).json({
            status: "success"
        });
    } catch (e) {
        console.log(e);
    }
});

