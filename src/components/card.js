import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import {
  Card, CardActionArea, CardMedia, CardContent,
  CardActions, Typography, Button, Divider,
} from '@material-ui/core';


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

  render() {
    const {classes, title, coverImage, price, selected} = this.props;
    if(!this.props.id) {
      return null;
    }

    return (
      <Card className={classes.root}>
        <CardActionArea disabled>
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
              {`${price.toLocaleString()}원`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider variant="middle" />
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
    if(this.props.fullCart && type === 'ADD') {
      window.alert('장바구니에는 최대 3개의 상품만 담을 수 있습니다.');
      return null;
    }
    const {id} = this.props;
    this.props.onChange({id, type});
  }
}

export default withStyles(styles)(ProductCard);