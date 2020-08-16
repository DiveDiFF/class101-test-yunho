import React from 'react';

import {fetchData} from '../actions';
import {Title} from '../components/title';
import {MaterialIcon} from '../components/widgets';
import {Link} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import {
  Paper, List, ListItem, ListItemIcon, Checkbox, TextField, Container,
  ListItemText, Typography, ListItemSecondaryAction, IconButton,
  FormControl, Table, TableContainer, TableBody, TableRow, TableCell, Button,
  Menu, MenuItem,
} from '@material-ui/core';

const priceCalculator = (cart) => {
  let subTotalPrice = 0;
  cart.map(item => {
    subTotalPrice = item.checked ? subTotalPrice + (item.price * item.quantity) : subTotalPrice;
    console.log(subTotalPrice, item.price, item.quantity);
    return subTotalPrice;
  });
  return subTotalPrice;
}

const discountCalculator = (cart, coupon) => {
  let discount = 0;
  if (coupon.type === 'rate') {
    discount = Math.floor(priceCalculator(cart) * (coupon.discountRate/100));
  } else if (coupon.type === 'amount') {
    discount = coupon.discountAmount;
  }
  return discount;
}

const styles = theme => ({
  root: {
    marginTop: '68px',
    height: '90vh',
  },
  emptyCart: {
    marginTop: '100px',
    textAlign: 'center',
    color: '#aaa'
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
  },
  buttonGroup: {
    textAlign: 'right',
    margin: '10px 0'
  },
  couponRoot: {
    // minWidth: '50px'
  },
  couponText: {
    fontSize: '0.7em'
  },
  tableRoot: {
    '@media (max-width:600px)': {
      display: 'block',
    },
    '& tr': {
      '@media (max-width:600px)': {
        display: 'block',
      },
    },
  },
  tablePadding: {
    '@media (max-width:600px)': {
      display: 'none',
    },
  },
  priceText: {
    '& span': {
      display: 'flex',
      alignItems: 'center',
    },
  },
});
class Cart extends React.Component {
  state = {
    cart: [],
    subTotalPrice: 0,
  }

  render() {
    const {classes} = this.props;
    const {cart, subTotalPrice} = this.state;

    return(
      <Paper className={classes.root} elevation={0}>
        <Title title="장바구니" />
        <Container>
          {!cart || cart.length === 0 ?
            <EmptyCart classes={classes}/> :
            <div>
              <CartItem cart={cart} onChange={this.handleChange} classes={classes} />
              <PriceSummary classes={classes} subTotalPrice={subTotalPrice} cart={cart} />
            </div>
          }
        </Container>
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
        const subTotalPrice = priceCalculator(cart);
        this.setState({...this.state, cart, subTotalPrice});
      }).catch(error => window.alert(`[오류], ${error}`));
  }

  handleChange = (cart) => {
    console.log(cart);
    const subTotalPrice = priceCalculator(cart);
    console.log(subTotalPrice);
    this.setState({...this.state, cart, subTotalPrice});
  }
}

const EmptyCart = ({classes}) => {
  return (
    <div className={classes.emptyCart}>
      <MaterialIcon icon="store" style={{fontSize: '100px'}}/>
      <Typography variant="h6" component="h4" gutterBottom>장바구니에 상품이 없습니다.</Typography>
      <Link to="/products">상품 목록 보기</Link>
    </div>
  );
}

class CartItem extends React.Component {
  render() {
    const {classes, cart} = this.props;

    return(
      <List>
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
                  onChange={(event)=> this.handleChangeQuantity(event, item.id)}
                />
              </FormControl>
            </ListItemText>
            <ListItemText className={classes.priceText}>
              <Typography variant="body2">{`${item.price.toLocaleString()}원`}</Typography>
              {item.availableCoupon === false &&
                <MaterialIcon style={{color: '#aaa', fontSize: '1em'}} title="쿠폰적용불가상품" icon="error"/>
              }
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
    );
  }
  handleToggleCheck = (id) => {
    const {cart} = this.props;
    cart.map(item => {
      return item.checked = item.id === id ? !item.checked : item.checked;
    });
    this.props.onChange(cart);
  }

  handleChangeQuantity = (event, id) => {
    const {value} = event.target;
    const {cart} = this.props;
    cart.map(item => {
      return item.quantity = item.id === id ? Number(value) : item.quantity;
    });
    this.props.onChange(cart);
  }

  handleClickDelete = (id) => {
    const cart = this.props.cart.filter(item => {
      return item.id !== id;
    });
    fetchData(`/cart`, {method: 'POST', body: cart})
      .then(() => this.props.onChange(cart))
      .catch(error => window.alert(`[오류], ${error}`));
  }
}

class PriceSummary extends React.Component {
  state = {
    coupons: [],
    discount: 0,
  }
  render() {
    const {classes, subTotalPrice} = this.props;
    const {discount, coupons} = this.state;

    return (
      <TableContainer>
        <Table className={classes.tableRoot}>
          <TableBody>
            <TableRow>
              <TableCell className={classes.tablePadding} rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{`${subTotalPrice?.toLocaleString()}원`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Discount</TableCell>
              <TableCell align="center">
                <div>
                  <SelectCoupon classes={classes} coupons={coupons} onChange={this.handleSelectCoupon}/>
                </div>
              </TableCell>
              <TableCell align="right">{`- ${discount?.toLocaleString()}원`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{`${(subTotalPrice - discount)?.toLocaleString()}원`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div aria-label="cart button group" className={classes.buttonGroup}>
          <Button variant="outlined" color="primary"><Link to="/products">계속쇼핑</Link></Button>
          <Button variant="contained" color="primary" onClick={this.handleClickGoCheck}>결제하기</Button>
        </div>
      </TableContainer>
    );
  }

  componentDidMount() {
    fetchData(`/coupons`, {method: 'GET'})
      .then(coupons => {
        console.log(coupons)
        this.setState({...this.state, coupons});
      }).catch(error => window.alert(`[오류], ${error}`));
  }



  handleClickGoCheck = () => {
    const totalPrice = this.props.subTotalPrice - this.state.discount;
    console.log('[CHECK!!!]', totalPrice);
  }

  handleSelectCoupon = (coupon) => {
    console.log(coupon);
    const {cart} = this.props;
    const cartWithCoupon = cart.filter(item => {
      return item.availableCoupon !== false;
    });
    const discount = discountCalculator(cartWithCoupon, coupon);
    this.setState({...this.state, discount});
  }
}


class SelectCoupon extends React.Component {
  state = {
    anchorEl: null,
    selectedIndex: 999,
  }

  render() {
    const {classes, coupons} = this.props;
    const {anchorEl, selectedIndex} = this.state;
    console.log(coupons);
    return (
      <div className={classes.couponRoot}>
        <List component="nav" aria-label="Device settings">
          <ListItem button onClick={this.handleClickListItem}>
            <ListItemText
              primaryTypographyProps={{className: classes.couponText}} primary="쿠폰적용"
              secondaryTypographyProps={{className: classes.couponText}} secondary={coupons[selectedIndex]?.title}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
        <MenuItem
          selected={selectedIndex === 999}
          onClick={(event) => this.handleMenuItemClick(event, 999)}
        >
          적용 안함
        </MenuItem>
          {coupons.map((coupon, index) => (
            <MenuItem
              key={Math.random() + index}
              selected={index === selectedIndex}
              onClick={(event) => this.handleMenuItemClick(event, index)}
            >
              {coupon.title}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  handleClickListItem = (event) => {
    console.log(event.currentTarget);
    this.setState({...this.state, anchorEl: event.currentTarget});
  };

  handleMenuItemClick = (event, index) => {
    console.log(index);
    const {coupons} = this.props;
    this.setState({...this.state, selectedIndex: index, anchorEl: null},
      this.props.onChange(coupons[index]));
  };

  handleClose = () => {
    this.setState({...this.state, anchorEl: null});
  };
}



export default withStyles(styles)(Cart);