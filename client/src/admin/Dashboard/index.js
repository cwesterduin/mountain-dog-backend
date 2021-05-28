import React from 'react'
import { Button } from '@material-ui/core';
import { DataTable, Menu } from '..'
import { Link } from 'gatsby'
import AddIcon from '@material-ui/icons/Add';

function Dashboard(){
    return (
        <>
        <Menu>
            
        <Button component={Link} to="./create" color="primary">
            <AddIcon/>Create
        </Button>

            <DataTable />

        </Menu>
        </>
    )
}

export default Dashboard