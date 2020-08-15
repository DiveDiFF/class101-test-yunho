import React from 'react';

import {fetchData} from '../actions';
import {Title} from '../components/title';
import {MaterialIcon} from '../components/widgets';

import {withStyles} from '@material-ui/core/styles';
import {
  Paper, List, ListItem, ListItemIcon, Checkbox, TextField,
  ListItemText, Typography, ListItemSecondaryAction, IconButton,
  FormControl,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    marginTop: '68px',
    height: '90vh',
  },
  list: {
    padding: '0px 30px',
  },
  listItem: {
    '@media (max-width:800px)': {
      maxWidth: '100%',
      display: 'inline-block',
      padding: 0,
    },
  },
  title: {
    flex: '1 0 28%',
  },
  img: {
    maxWidth: 160,
    '@media (max-width:800px)': {
      maxWidth: '100%',
    },
  },
  action: {
    '@media (max-width:800px)': {
      top: '90%',
    },
  }
});
class Cart extends React.Component {
  state = {
    cart: [],
  }

  render() {
    const {classes} = this.props;
    const {cart} = this.state;

    return(
      <Paper className={classes.root} elevation={0}>
        <Title title="장바구니" />
        <CartItem cart={cart} onChange={this.handleChange} classes={classes} />
      </Paper>
    );
  }

  componentDidMount() {
    fetchData(`/cart`, {method: 'GET'})
      .then(response => {
        console.log(response)
        const cart = response.map(item => {
          return {...item, checked: true, quantity: 1};
        });
        console.log(cart, this.state)
        this.setState({...this.state, cart});
      }).catch(error => window.alert(`장바구니에 상품이 없습니다.`));
  }

  handleChange = (cart) => {
    console.log(cart);
    this.setState({...this.state, cart})
  }

}

class CartItem extends React.Component {
  render() {
    const {classes, cart} = this.props
    return(
      <List className={classes.list}>
          {cart && cart.map((item, index) =>
            <ListItem divider className={classes.listItem}
              key={item.id || index + Math.random()}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.checked}
                  onChange={()=> this.handleToggleCheck(item.id)}
                />
              </ListItemIcon>
              <ListItemText className={classes.title}>
                <Typography variant="body2" gutterBottom>{item.title}</Typography>
                <img src={item.coverImage} className={classes.img}/>
              </ListItemText>
              <ListItemText>
                <FormControl>
                  <TextField
                    id="outlined-number" label="수량" type="number"
                    value={item.quantity || 1}
                    variant="outlined"
                    inputProps={{min: 1, max: 99, maxLength: '2'}}
                    size="small"
                    onChange={this.handleChangeQuantity(item.id)}
                  />
                </FormControl>
              </ListItemText>
              <ListItemText>
                <Typography variant="body2">{`월 ${item.price.toLocaleString()}원`}</Typography>
              </ListItemText>
              <ListItemSecondaryAction className={classes.action}>
              <IconButton
                edge="end" aria-label="delete"
                onClick={()=> this.handleClickDelete(item.id)}
              >
                <MaterialIcon icon="delete" title="삭제"/>
              </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
    )
  }
  handleToggleCheck = (id) => {
    const {cart} = this.props;
    cart.map(item => {
      return item.checked = item.id === id ? !item.checked : item.checked;
    });
    this.props.onChange(cart);
  }

  handleChangeQuantity = (id) => (event) => {
    const {value} = event.target;
    const {cart} = this.props;
    cart.map(item => {
      return item.quantity = item.id === id ? value : item.quantity;
    });
    this.props.onChange(cart);
  }

  handleClickDelete = (id) => {
    const cart = this.props.cart.filter(item => {
      return item.id !== id;
    })
    fetchData(`/cart`, {method: 'POST', body: cart})
      .then(() => this.props.onChange(cart))
      .catch(error => window.alert(`[오류], ${error}`));
  }
}


export default withStyles(styles)(Cart);