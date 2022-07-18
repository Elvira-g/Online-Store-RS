import { drowCard } from './functions'

interface ICard {
    id: string;
    name: string;
    manufacturer: string;
    price: string;
    size: string;
}


class Card {
    constructor (public block: HTMLDivElement) {
        this.block = block;
    }
    
    drawAllCards(data: ICard[]) {
        const cards: ICard[] = data;
        console.log(cards)
        cards.forEach((card: ICard) => {
            drowCard(this.block, card.id, card.name, card.manufacturer, card.price, card.size);
        })
    }
}

export default Card