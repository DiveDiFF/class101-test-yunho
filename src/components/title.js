import React from 'react';
import {Container, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#111',
    color: '#fff',
    padding: '32px 32px',
  },
  // container: {
  //   backgroundColor: '#111',
  //   color: '#fff',
  //   padding: '32px 32px',
  // },
  title: {
  },
});

const Title = ({title = ''}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h5" component="h2" className={classes.title}>{title}</Typography>
      </Container>
    </div>
  )
}

export {Title}