import React from 'react';

import {fetchData} from '../actions';
import {Title} from '../components/title';
import {MaterialIcon} from '../components/widgets';

import {withStyles} from '@material-ui/core/styles';
import {
  Paper, List, ListItem, ListItemIcon, Checkbox,
  ListItemText, Typography, ListItemSecondaryAction, IconButton
} from '@material-ui/core';

const styles = theme => ({
  root: {
    marginTop: '68px',
    height: '90vh',
  },
  list: {
    padding: '0px 80px'
  },
  title: {
    textAlign: 'center',
    flex: '1 0 28%',
  },
  img: {
    maxWidth: 200,
  },
});
class Cart extends React.Component {
  state = {
    cart: [],
    checkedItem: [],
  }

  render() {
    const {classes} = this.props;
    const {cart, checkedItem} = this.state;

    return(
      <Paper className={classes.root} elevation={0}>
        <Title title="장바구니" />
        <List className={classes.list}>
          {cart && cart.map((item, index) =>
            <ListItem divider button
              key={item.id || index + Math.random()}>
              <ListItemIcon>
                <Checkbox edge="start" checked={checkedItem.indexOf(item.id) !== -1}/>
              </ListItemIcon>
              <img src={item.coverImage} className={classes.img}/>
              <ListItemText className={classes.title}>
                <Typography variant="body2">{item.title}</Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="body2">{`월 ${item.price.toLocaleString()}원`}</Typography>
              </ListItemText>
              <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <MaterialIcon icon="delete" title="삭제"/>
              </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </Paper>
    );
  }

  componentDidMount() {
    fetchData(`/cart`, {method: 'GET'})
      .then(cart => {
        const checkedItem = [];
        cart.forEach(item => {
          return checkedItem.push(item.id);
        });
        this.setState({...this.state, cart, checkedItem});
      }).catch(error => window.alert(`[오류] 상품 정보를 불러올 수 없습니다. ${error}`));
  }
}


export default withStyles(styles)(Cart);