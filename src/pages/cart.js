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
    return subTotalPrice;
  });
  return subTotalPrice;
}

const discountCalculator = (cart, coupon) => {
  const cartWithCoupon = cart.filter(item => {
    return item.availableCoupon !== false;
  });
  let discount = 0;
  if (coupon.type === 'rate') {
    discount = Math.floor(priceCalculator(cartWithCoupon) * (coupon.discountRate/100));
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
    color: '#aaa',
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
    minWidth: '40px',
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
    coupons: [],
    subTotalPrice: 0,
    discount: 0,
    coupon: {},
  }

  render() {
    const {classes} = this.props;
    const {cart, coupons, subTotalPrice, discount} = this.state;

    return(
      <Paper className={classes.root} elevation={0}>
        <Title title="장바구니" />
        <Container>
          {!cart || cart.length === 0 ?
            <EmptyCart classes={classes}/> :
            <div>
              <CartItem cart={cart} onChange={this.handleCartItemChange} classes={classes} />
              <PriceSummary
                classes={classes}
                subTotalPrice={subTotalPrice}
                discount={discount}
                coupons={coupons}
                onChange={this.handlePriceSummaryChange}
              />
            </div>
          }
        </Container>
      </Paper>
    );
  }

  componentDidMount() {
    fetchData(`/cart`, {method: 'GET'})
      .then(response => {
        fetchData(`/coupons`, {method: 'GET'})
          .then(coupons => {
            const cart = response.map(item => {
              return {...item, checked: true, quantity: 1};
            });
            const subTotalPrice = priceCalculator(cart);
            this.setState({...this.state, coupons, subTotalPrice, cart});
          });
      }).catch(error => window.alert(`[오류], ${error}`));
  }

  handleCartItemChange = (cart) => {
    const {coupon} = this.state;
    const subTotalPrice = priceCalculator(cart);
    const discount = discountCalculator(cart, coupon);
    this.setState({...this.state, cart, subTotalPrice, discount});
  }

  handlePriceSummaryChange = (coupon) => {
    const {cart} = this.state;
    const discount = discountCalculator(cart, coupon);
    this.setState({...this.state, discount, coupon});
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
              <img alt={item.title} src={item.coverImage} className={classes.img}/>
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
  render() {
    const {classes, coupons, subTotalPrice, discount} = this.props;

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

  handleClickGoCheck = () => {
    const totalPrice = this.props.subTotalPrice - this.state.discount;
    console.log('[GoCheck!!]', totalPrice);
  }

  handleSelectCoupon = (coupon) => {
    this.props.onChange(coupon);
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
    this.setState({...this.state, anchorEl: event.currentTarget});
  };

  handleMenuItemClick = (event, index) => {
    const {coupons} = this.props;
    this.setState(
      {...this.state, selectedIndex: index, anchorEl: null},
      this.props.onChange(coupons[index])
    );
  };

  handleClose = () => {
    this.setState({...this.state, anchorEl: null});
  };
}

export default withStyles(styles)(Cart);