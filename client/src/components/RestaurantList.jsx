import React from 'react'

const RestaurantList = () => {
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
            <tr>
                <td>Tim Hortons</td>
                <td>Calgary</td>
                <td>$$</td>
                <td>Rating</td>
                <td><button className="btn btn-warning">Update</button></td>
                <td><button className="btn btn-warning">Delete</button></td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList
