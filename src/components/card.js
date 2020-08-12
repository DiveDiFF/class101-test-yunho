import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import {Card, CardActionArea, CardMedia, CardContent, CardActions, Typography, Button} from '@material-ui/core';


const styles = theme => ({
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

class ProductCard extends React.Component {
  state = {
    selected: false,
  }

  render() {
    const {classes, title, coverImage, price} = this.props;
    const {selected} = this.state;
    console.log(this.props);
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.img}
            image={coverImage}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="subtitle2" component="h3" className={classes.title}>
              {title}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p">
              {price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          { !selected ?
            <Button fullWidth size="small" color="primary" onClick={() => this.handleClickToCart('ADD')}>
              담기
            </Button>
            :
            <Button fullWidth size="small" color="secondary" onClick={() => this.handleClickToCart('DEL')}>
              빼기
            </Button>}
        </CardActions>
      </Card>
    );
  }

  handleClickToCart = (type) => {
    const {id} = this.props
    const selected = type == 'ADD'
    this.setState({selected}, this.props.onChange({id, type}));
  }
}


export default withStyles(styles)(ProductCard);