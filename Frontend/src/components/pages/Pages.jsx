import React from "react"
import Header from "../common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "../home/Home"
import Footer from "../common/footer/Footer"
import About from "../about/About"
import Contact from "../pages/Contact" 
import Login from "../auth/Login"
import Signup from "../auth/Signup"
import AddProperty from "../properties/AddProperty"
import PropertyDetail from "../properties/PropertyDetail"
import EditProperty from "../properties/EditProperty" 
import SearchResults from "../search/SearchResults"


const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/contact' component={Contact} />  
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/add-property' component={AddProperty} />
          <Route exact path='/edit-property/:id' component={EditProperty} />
          <Route exact path='/property/:id' component={PropertyDetail} />  
          <Route exact path='/search' component={SearchResults} />
        </Switch>
        <Footer />
      </Router>
    </>
  )
}


export default Pages
