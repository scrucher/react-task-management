import { Grid } from '@material-ui/core';
import React from 'react';
import TasksCard from './card.omponent';
export function TaskApp() {
    return (
        <Grid>
            <TasksCard />
        </Grid>
    );
}