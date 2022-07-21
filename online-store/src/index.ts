import data from './components/products';
import Card from './components/Card';
import { addToCart } from './components/functions';
import filtersFunc from './components/filters';
import '@/css/style.css';

// localStorage.setItem('checkedFilters',JSON.stringify({}));
// localStorage.setItem('addedToCart',JSON.stringify([]));

const block = <HTMLDivElement>document.querySelector('.cards-block');
const item = new Card(block);
item.drawAllCards(data);
addToCart();
filtersFunc(data);
