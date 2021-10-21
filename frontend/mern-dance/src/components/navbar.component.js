import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

   render() {
       return (
           <nav ClassName="navbar navbar-dark bg-dark navbar-expand-lg">
               <Link to="/" className="navbar-brand">Dashboard</Link>
               <div className="collpase navbar-collapse">
                   <ul className="navbar-nav mr-auto">
                       <li className="navbar-item">
                           <Link to="/dancer1" className="nav-link">Dancer1</Link>
                       </li>
                       <li className="navbar-item">
                           <Link to="/dancer2" className="nav-link">Dancer2</Link>
                       </li>
                       <li>
                           <Link to="/dancer3" className="nav-link">Dancer3</Link>
                       </li>
                       <li>
                           <Link to="/survey" className="nav-link">Survey</Link>
                       </li>
                   </ul>
               </div>
           </nav>
       )
   }
}