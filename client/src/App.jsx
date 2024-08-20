import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantDetails from './routes/RestaurantDetails';
import { RestaurantsContextProvider } from './contextAPI/RestaurantsContext';

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className='vh-100 bg-info container-fluid'>
                <div className='container'>
                    <Router>
                        <Switch>
                            <Route exact path = "/" component = {Home}/>
                            <Route exact path = "/restaurants/:id/update" component = {UpdatePage}/>
                            <Route exact path = "/restaurants/:id" component = {RestaurantDetails}/>
                        </Switch>
                    </Router>
                </div>
            </div>
            
        </RestaurantsContextProvider>
    );
}

export default App;