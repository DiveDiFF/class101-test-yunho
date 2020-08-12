import {productItems} from './datas/productItems';

const fetchData = async ({pagination}) => {
  console.log(pagination);

  return await getData({pagination});
}

const getData = ({pagination}) => {
  console.log(pagination)
  const pageIndex = (Number(pagination) - 1) * 5;
  return productItems.slice(pageIndex ,pageIndex + 5);
}

export {fetchData}