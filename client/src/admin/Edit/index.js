import React from 'react'
import {  Menu } from '..'
import { Trip, EventM, Media } from '../Forms'
import { useParams, Redirect } from "@reach/router"
// then 
function Edit(){
    const { type, id } = useParams()
    let form

    switch(type) {
        case 'events':
          form = <EventM/>
          break;
        case 'trips':
          form = <Trip/>
          break;
        case 'map-features':
            form = <div>Hello3</div>
            break;
        case 'media':
            form = <Media />
            break;
        default:
            form = <Redirect to="/app/admin/" />
      }
    return(
        <Menu>
            <h2>Edit {type}: {id}</h2>
            {form}
        </Menu>
    )
}

export default Edit