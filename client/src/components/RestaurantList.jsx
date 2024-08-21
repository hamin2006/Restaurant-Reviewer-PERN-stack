import React, {useContext, useEffect} from 'react'
import RestaurantFinder from '../contextAPI/RestaurantFinder';
import { RestaurantsContext } from '../contextAPI/RestaurantsContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    let history = useHistory();
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
    const handleDelete = async (e,id) => {
        e.stopPropagation();
        try {
            const res = await RestaurantFinder.delete("/" + id);
            setRestaurants(restaurants.filter(restaurant => {return restaurant.id !== id}));
        } catch (e) {

        }
    }

    const handleUpdate = async (e,id) => {
        e.stopPropagation();
        try {
            history.push("/restaurants/" + id + "/update");
        } catch (e) {

        }
    }

    const handleRestaurantSelect = (id) => {
        history.push('/restaurants/'+id);
    }

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
                    <tr onClick = {() => handleRestaurantSelect(restaurant.id)} key = {restaurant.id}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>Rating</td>
                        <td><button onClick={(e) => handleUpdate(e,restaurant.id)} className="btn btn-warning">Update</button></td>
                        <td><button onClick={(e) => handleDelete(e,restaurant.id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList
