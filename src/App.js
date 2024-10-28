import {Switch, BrowserRouter, Route} from 'react-router-dom';
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import './App.css';

const  App = ()=>{
  return(
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/login" exact component = {Login}/>
        <Route path="/signup" exact component={SignUp}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;