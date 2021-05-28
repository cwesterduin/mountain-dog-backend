import React from 'react'
import {  Menu } from '..'
import { Trip } from '../Forms'
import { useParams, Redirect } from "@reach/router"
// then 
function Edit(){
    const { type, id } = useParams()
    let form

    switch(type) {
        case 'events':
          form = <div>Hello1</div>
          break;
        case 'trips':
          form = <Trip/>
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
            <h2>Edit {type}: {id}</h2>
            {form}
        </Menu>
    )
}

export default Edit