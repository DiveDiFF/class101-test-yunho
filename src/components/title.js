import React from 'react';
import {Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {

    backgroundColor: '#111',
    color: '#fff',
    padding: '30px 30px',
  },
});

const Title = ({title = ''}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={0}>
      <Typography variant="h5" component="h2">{title}</Typography>
    </Paper>
  )
}

export {Title}