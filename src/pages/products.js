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
  },
  cardContainer: {
    textAlign: '-webkit-center',
    padding: '10px',
    margin: '0 auto',
  },
  card: {
    textAlign: 'center',
    padding: '5px',
    flex: '1 0 20%',
    maxWidth: '20%',
    '@media (max-width:750px)': {
      flex: '1 0 100%',
      maxWidth: '100%',
      display: 'inline-block',
    },
  },
});
class Products extends React.Component {
  state = {
    products: [],
    cart: [],
    pagination: 1,
    pageEnd: false,
  }

  render() {
    const {classes} = this.props;
    const {products, cart, pageEnd} = this.state;

    if (!products || products.length === 0) return null
    return(
      <Paper className={classes.root} elevation={0}>
        <Title title="상품목록" />
        <div className={classes.cardContainer}>
          <Grid container spacing={3} justify="space-around">
            {products.length > 0 && products.map((product , index) =>
              <Grid item className={classes.card} key ={product.id || index + Math.random()}>
                <ProductCard
                  onChange={this.handleChangeCartItem}
                  id={product.id}
                  title={product.title}
                  coverImage={product.coverImage}
                  price={product.price}
                  fullCart={cart.length === 3}
                />
              </Grid>
            )}
          </Grid>
        </div>
        {!pageEnd &&
          <Button size="large" fullWidth variant="contained" color="primary"
            onClick={this.handleClickMoreProducts}>더보기</Button>
        }
      </Paper>
    );
  }

  componentDidMount() {
    const {pagination} = this.state;
    console.log('[COMPONENTDIDMOUNT]', pagination)
    fetchData(`/products`, {method: 'GET', pagination})
      .then(response => {
        console.log('[Products]', response);
        this.setState({...this.state, products: response.products});
      }).catch(error => window.alert('[서버 에러] 상품 정보를 불러올 수 없습니다.'));
  }

  handleChangeCartItem = ({type, id}) => {
    console.log('!!!',type, id);
    const {products} = this.state;
    let cart = [];

    if (type === 'ADD') {
      const selectProduct = products.find(product => product.id === id);
      cart = [...this.state.cart, selectProduct];
    } else {
      cart = this.state.cart.filter(product => product.id !== id);
    }
    fetchData(`/products`, {method: 'POST', body: cart})
      .then(() => this.setState({...this.state, cart}));
  }

  handleClickMoreProducts = () => {
    const pagination = this.state.pagination + 1
    fetchData(`/products`, {method: 'GET', pagination})
      .then(response => {
        console.log('[CLICK MORE BUTTON FETCH]', response);
        const products = [...this.state.products, ...response.products];
        const pageEnd = pagination === response.meta.totalPage
        this.setState({...this.state, pagination, products, pageEnd});
      }).catch(error => window.alert(`[오류], ${error}`));
  }
}

export default withStyles(styles)(Products);