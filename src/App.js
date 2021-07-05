import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivetRoute from './components/PrivetRoute/PrivetRoute';

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
          </Route>
          <Route path="/Review">
            <Review></Review>
          </Route>
          <PrivetRoute path="/manage">
            <Inventory></Inventory> 
          </PrivetRoute >
          <PrivetRoute path="/shipment">
            <Shipment></Shipment>
            </PrivetRoute> 
          <Route path="/login">
            <Login></Login>
          </Route>

          <Route exact path="/">
          <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
             <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
          <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      
        
    </UserContext.Provider>
  );
}

export default App;
