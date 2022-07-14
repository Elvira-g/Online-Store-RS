import data from './components/products';
import Card from './components/Card';
import '@/css/style.css';

const block = <HTMLDivElement>document.querySelector('.cards-block');
const item = new Card(block);
item.drawAllCards(data)
