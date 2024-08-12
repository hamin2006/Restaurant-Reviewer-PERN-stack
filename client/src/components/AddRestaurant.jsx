import React, { useContext, useState } from 'react'
import RestaurantFinder from '../contextAPI/RestaurantFinder';
import { RestaurantsContext } from '../contextAPI/RestaurantsContext';

const AddRestaurant = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("Price Range");
    const {addRestaurants} = useContext(RestaurantsContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await RestaurantFinder.post("/", {name,location,price});
            addRestaurants(res.data.data.restaurant);
        } catch(e) {

        }
    }
  return (
    <div class = "mb-4">
      <form action="">
        <div className="form-row">
            <div className="col">
                <input 
                    value = {name} 
                    onChange = {e => setName(e.target.value)} 
                    type="text" 
                    className='form-control' 
                    placeholder='Name'/>
            </div>
            <div className="col">
                <input 
                    value = {location} 
                    onChange = {e => setLocation(e.target.value)}
                    type="text" 
                    className='form-control' 
                    placeholder='Location'/>
            </div>
            <div className="col">
                <select value = {price} onChange = {e => setPrice(e.target.value)} className='custom-select mr-sm-2'>
                    <option disabled >Price Range</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>
            </div>
            <button onClick={handleSubmit} type = "submit" className='btn btn-primary'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant
