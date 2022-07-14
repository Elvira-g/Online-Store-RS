import data from './components/products';
import Card from './components/Card';
import { addToCart } from './components/functions'
import '@/css/style.css';

const block = <HTMLDivElement>document.querySelector('.cards-block');
const item = new Card(block);
item.drawAllCards(data);
addToCart()
