import {productItems} from './datas/productItems';
import {Coupons} from './datas/coupons';

const fetchData = async (path, option = {}) => {
  console.log(path, option);
  if (path === `/products`) {
    productItems.sort((x,y) => y.score - x.score)
    if (option.method === 'GET') {
      console.log('[FETCH GET PRODUCTS]');
      return await getProductsData(option.pagination);
    } else if (option.method === 'POST') {
      console.log('[FETCH POST PRODUCTS]', option);
    }
  } else {
    console.log('[FETCH GET COUPONS]');
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

const getCouponsData = () => {
  console.log('[FUNC GET COUPONS]');
  return Coupons;
}

export {fetchData}