import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Card, CardActionArea, CardMedia, CardContent, CardActions, Typography, Button} from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    wordBreak: 'keep-all',
    maxWidth: '370px',
    minWidth: '150px'
  },
  img: {
    height: '280px',
  },
  title: {
    height: '80px',
  },
});

const ProductCard = (props) => {
  const classes = useStyles();
  console.log(props)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.img}
          image={props.coverImage}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="h3" className={classes.title}>
            {props.title}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            {props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button fullWidth size="small" color="primary">
          담기
        </Button>
        <Button fullWidth size="small" color="primary">
          빼기
        </Button>
      </CardActions>
    </Card>
  );
}

export {ProductCard}