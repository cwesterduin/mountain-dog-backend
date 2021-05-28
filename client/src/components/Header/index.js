import React from "react"
import { Link } from "gatsby"

const Header = () => (
  <header>
    <div>
      <h1>
        <Link to="/">
          Gatsby Auth
        </Link>
      </h1>
      <nav role="main">
        <Link to="/">
          Home
        </Link>
        <Link to="/app/profile">
          Profile
        </Link>
        <Link to="/app/details">
          Details
        </Link>
      </nav>
    </div>
  </header>
)

export default Header
