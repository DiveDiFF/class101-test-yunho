import {productItems} from './datas/productItems';
import {coupons} from './datas/coupons';

const fetchData = async (path, option = {}) => {
  if (path === `/products`) {
    productItems.sort((x,y) => y.score - x.score)
    if (option.method === 'GET') {
      return await getProductsData(option.pagination);
    }
  } else if (path === `/cart`) {
    if (option.method === 'POST') {
      return await postCartData(option.body);
    } else if (option.method === 'GET') {
      return await getCartData();
    }
  } else if (path === `/coupons`) {
    return await getCouponsData();
  }
}

const getProductsData = (pagination) => {
  console.log('[PAGE]', pagination)
  const pageIndex = (Number(pagination) - 1) * 5;
  const totalPage = Math.ceil(productItems.length / 5);
  productItems.push({});
  return {products: productItems.slice(pageIndex ,pageIndex + 5), meta: {totalPage}};
}

const postCartData = (body) => {
  window.localStorage.setItem('cart', JSON.stringify(body));
}

const getCartData = () => {
  const cart = JSON.parse(window.localStorage.getItem('cart'));
  console.log('[GET]', cart)
  return cart || [];
}

const getCouponsData = () => {
  console.log('[FUNC GET COUPONS]', coupons);
  return coupons;
}

export {fetchData}