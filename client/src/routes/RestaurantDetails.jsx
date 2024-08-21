import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { RestaurantsContext } from '../contextAPI/RestaurantsContext';
import RestaurantFinder from '../contextAPI/RestaurantFinder';
import Stars from '../components/Stars';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const RestaurantDetails = () => {
  const {id} = useParams();
  const {selRes, setSelRes} = useContext(RestaurantsContext);
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await RestaurantFinder.get("/"+id);
        setSelRes(response.data.data);
      } catch (e) {

      }
    }
    fetchData();
  },[])
  return (
    <div> {selRes && (
      <>
      <h1 className='text-center display-1'>{selRes.restaurants.name}</h1>
      
      <div className="pt-3">
        <Reviews reviews = {selRes.reviews}/>
        <AddReview/>
      </div>
      </>
    )}</div>
  )
}

export default RestaurantDetails
