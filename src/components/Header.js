import React from 'react';
import { Link } from "react-router-dom"

function Header() {
  return (
    <div>
        <h1>BuyList</h1>
        <h6>Open Source Shopping List Progressive Web Application</h6>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
        </nav>
    </div>
  );
}

export default Header;