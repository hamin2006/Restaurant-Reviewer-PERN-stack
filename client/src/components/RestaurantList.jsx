import React, {useContext, useEffect} from 'react'
import RestaurantFinder from '../contextAPI/RestaurantFinder';
import { RestaurantsContext } from '../contextAPI/RestaurantsContext';

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants);
            } catch (e) {

            }
        };
        fetchData();
    },[]);
  return (
    <div>
      <table class="table table-hover table-dark">
        <thead>
            <tr className='bg-primary'>
                <th scope="col">Restaurants</th>
                <th scope="col">Location</th>
                <th scope="col">Price</th>
                <th scope="col">Ratings</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            {restaurants && restaurants.map(restaurant => {
                return (
                    <tr key = {restaurant.id}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList
