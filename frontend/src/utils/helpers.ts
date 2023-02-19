import axios from 'axios';
import { filterProduct } from 'src/store/product-data/product-data';
import { store } from 'src/store/store';

export const generateQueryString = (limit = '10000', page?: string) => {
  let productType;
  let sortDirection;
  let sortField;
  let amountOfString;
  const controlElement = store.getState().CONTROL_ELEMENT;
  if (controlElement.acoustic) {
    productType = 'аккустика';
  }
  if (controlElement.electric) {
    productType = 'электро';
  }
  if (controlElement.ukulele) {
    productType = 'укулеле';
  }
  if (controlElement.asc) {
    sortDirection = 'asc';
  }
  if (controlElement.desc) {
    sortDirection = 'desc';
  }
  if (controlElement.date) {
    sortField = 'createdAt';
  }
  if (controlElement.cost) {
    sortField = 'cost';
  }
  if (controlElement.rating) {
    sortField = 'rating';
  }
  if (controlElement.four) {
    amountOfString = '4';
  }
  if (controlElement.six) {
    amountOfString = '6';
  }
  if (controlElement.seven) {
    amountOfString = '7';
  }
  if (controlElement.twelve) {
    amountOfString = '12';
  }

  return `?limit=${limit}&sortField=${sortField ?? ''}&sortDirection=${sortDirection ?? ''}&productType=${productType ?? ''}&page=${page ?? ''}&amountOfString=${amountOfString ?? ''}`
};

export const filterPoducts = async () => {
  const {data: products} = await axios.get(`http://localhost:3335/api/product${generateQueryString()}`);
  const controlElement = store.getState().CONTROL_ELEMENT;
  store.dispatch(filterProduct({
    from: controlElement.from,
    to: controlElement.to,
    products
  }));
}
