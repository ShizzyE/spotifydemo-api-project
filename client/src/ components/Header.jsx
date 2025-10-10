import React from "react";
import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/spotify-logo.png";


export default function Header() {

    return (
        <header className="w-full bg-green-500 sticky top-0 z-40 p-1">
            <nav className="flex flex-row justify-between items-center">
               <div>
                 <img src={Logo} alt="spotify logo" className="mx-auto mb-4 max-w-10 -rotate-20" />
                </div> 

                <div>
                    <input type="text" placeholder="test" 
                    className="text-center"/>
                </div>

                <ul className="flex">
                   <li><Link to="/home">Home</Link></li>
                   <li><Link to="/search">Search</Link></li> 
                   <li><Link to="/favorites">Favorites</Link></li>  
                </ul>
            </nav>
        </header>
    )
};