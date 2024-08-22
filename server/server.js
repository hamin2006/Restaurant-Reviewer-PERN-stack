require("dotenv").config();

const express = require("express");
const db = require("./db");
const app = express();
const cors = require("cors");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log('server running on port ' + port);
});

app.get("/api/v1/restaurants", async (req,res) => {
    //Return list of restaurants from postgres
    try {
        const results = await db.query("select * from restaurants left join (select res_id, COUNT(*), TRUNC(AVG(rating),1) " + 
            "as average_rating from reviews group by res_id) reviews on restaurants.id = reviews.res_id");
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
        const results = await db.query("select * from restaurants left join (select res_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by res_id) reviews on restaurants.id = reviews.res_id where id = $1", 
            [req.params.id]);
        const reviews = await db.query("select * from reviews where res_id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurants: results.rows[0],
                reviews: reviews.rows
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
                restaurant: results.rows[0],
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

app.post("/api/v1/restaurants/:id/addReview", async (req,res) => {
    //Add a review
    try {
        const results = await db.query(
            "INSERT INTO reviews (res_id, name, review, rating) values ($1, $2, $3, $4) returning *", 
            [req.params.id, req.body.name, req.body.review, req.body.rating]);
        res.status(201).json({
            status: "success",
            data: {
                review: results.rows[0],
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

