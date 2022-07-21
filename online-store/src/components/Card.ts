import { drowCard } from './functions';
import { ICard } from './interfaces';


export class Card {
    constructor (public block: HTMLElement) {
        this.block = block;
    }
    
    drawAllCards(data: ICard[]) {
        const cards: ICard[] = data;
        console.log(cards)
        cards.forEach((card: ICard) => {
            drowCard(this.block, card);
        })
    }
}

// card.id, card.name, card.manufacturer, card.price, card.size, card.count, card.year

export default Card