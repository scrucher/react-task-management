import { Grid } from '@material-ui/core';
import React from 'react';
import TasksCard from './card.omponent';
import NavBar from './nav-bar.component';

export function TaskApp (){
    return (
        <Grid>
            <NavBar />
            <TasksCard />           
        </Grid>
    );
}