import React from 'react';

import {fetchData} from '../actions';
import {Title} from '../components/title';
import ProductCard from '../components/card';

import {withStyles} from '@material-ui/core/styles';
import {Paper, Button, Grid} from '@material-ui/core';


const styles = theme => ({
  root: {
    marginTop: '68px',
    height: '90vh',
    flexGrow: 1,
  },
  cardContainer: {
    textAlign: 'center',
    padding: '10px',
    margin: '0 auto',
  },
  card: {
    padding: '5px',
  },
});
class Products extends React.Component {
  state = {
    products: [],
    cart: [],
  }

  render() {
    const {classes} = this.props;
    const {products, cart} = this.state;
    console.log(cart.length);

    if (products.length == 0) return null
    return(
      <Paper className={classes.root} elevation={0}>
        <Title title="상품목록" />
        <div className={classes.cardContainer}>
          <Grid container spacing={3} justify="space-around">
            {products.length > 0 && products.map((product) =>
              <Grid item xs={12} sm={2} className={classes.card} key ={product.id}>
                <ProductCard
                  onChange={this.handleChangeCartItem}
                  id={product.id}
                  title={product.title}
                  coverImage={product.coverImage}
                  price={`월 ${product.price.toLocaleString()}원`}
                  fullCart={cart.length == 3}
                />
              </Grid>
            )}
          </Grid>
          <Button fullWidth variant="contained" color="primary">더보기</Button>
        </div>
      </Paper>
    );
  }

  componentDidMount() {
    console.log(this.state);
    fetchData({pagination: 1})
      .then(products => {
        console.log('[Products]', products);
        this.setState({...this.state, products});
      });
  }

  handleChangeCartItem = ({type, id}) => {
    console.log('!!!',type, id);
    const {products} = this.state;
    let cart = [];

    if (type == 'ADD') {
      const selectProduct = products.find(product => product.id == id);
      cart = [...this.state.cart, selectProduct];
    } else {
      cart = this.state.cart.filter(product => product.id != id);
    }
    this.setState({...this.state, cart});
  }
}

export default withStyles(styles)(Products);