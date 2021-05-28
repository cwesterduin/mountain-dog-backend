import React from "react"
import { Helmet } from "react-helmet"

import Header from "../Header"

// Global styles and component-specific styles.
import "./global.css"

const Layout = ({ children }) => (
  <div>
    <Helmet>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          rel="stylesheet"
      />
    </Helmet>
    <Header />
    <main>{children}</main>
  </div>
)

export default Layout
