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
                <td>New York</td>
                <td>$$</td>
            </tr>
            <tr>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            <tr>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList
