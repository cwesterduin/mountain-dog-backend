import React from 'react'
import {  Menu } from '..'
import { Trip, EventM } from '../Forms'
import { useParams, Redirect } from "@reach/router"
// then 
function Create(){
    const { type } = useParams()
    let form

    switch(type) {
        case 'events':
          form = <EventM/>
          break;
        case 'trips':
          form = <Trip />
          break;
        case 'map-features':
            form = <div>Hello3</div>
            break;
        case 'media':
            form = <div>Hello4</div>
            break;
        default:
            form = <Redirect to="/app/admin/" />
      }
    return(
        <Menu>
            <h2>Create {type}</h2>
            {form}
        </Menu>
    )
}

export default Create