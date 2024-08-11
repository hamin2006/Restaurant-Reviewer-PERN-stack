//import { config } from "dotenv";
//import express from "express";
require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('server running on port ' + port);
});

app.get("/api/v1/restaurants", (req,res) => {
    //Return list of restaurants from postgres
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

