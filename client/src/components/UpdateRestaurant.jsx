import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import RestaurantFinder from '../contextAPI/RestaurantFinder';

const UpdateRestaurant = (props) => {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    let history = useHistory(); 
    useEffect(() => {
        const fetchData = async() => {
            const response = await RestaurantFinder.get("/"+id);
            setName(response.data.data.restaurants.name);
            setLocation(response.data.data.restaurants.location);
            setPrice((response.data.data.restaurants.price_range));
        };
        fetchData();
    },[]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await RestaurantFinder.put("/"+id, {name,location,price});
        } catch(e) {

        }
        history.push("/");
    }
    
  return (
    <div>
      <form action="">
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input value = {name} onChange={e => setName(e.target.value)} className = "form-control" id = "name" type="text" />
        </div>

        <div className="form-group">
            <label htmlFor="location">Location</label>
            <input value = {location} onChange={e => setLocation(e.target.value)} className = "form-control" id = "location" type="text" />
        </div>

        <div className="form-group">
            <label htmlFor="price">Price</label>
            <input value = {price} onChange={e => setPrice(e.target.value)} className = "form-control" id = "price" type="number" />
        </div>

        <button type = "submit" onClick = {handleUpdate} className="btn btn-primary col mt-3">Submit</button>
      </form>
    </div>
  )
}

export default UpdateRestaurant;