import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import { Dashboard, Create } from "../admin"
import Login from "../components/Login"
import PrivateRoute from "../components/PrivateRoute"
import Status from "../components/Status"

const App = () => (
  <>
    <Status />
    <Router>
      <PrivateRoute path="/app/admin" component={Dashboard} />
      <PrivateRoute path="/app/admin/:type" component={Dashboard} />
      <PrivateRoute path="/app/admin/:type/create" component={Create} />
      <Login path="/app/login" />
    </Router>
  </>
)

export default App