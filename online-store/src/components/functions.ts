export function drowCard(block: HTMLElement, id: string, name: string, manufacturer: string, price: string, size: string) {
    
    // const cardItem = `<div class="card" id= ${id}>
    //     <img src="./assets/img/products/${id}.png" alt="" class="card-img">
    //     <h3 class="card-title">${name}</h3>
    //     <p class="card-subtitle card-brand">${manufacturer}</p>
    //     <div class="card-text-block">
    //         <p class="card-text card-size">размер: ${size}</p>
    //         <p class="card-text card-price">${price} руб.</p>
    //     </div>
    // </div>`;

    const cardItem = document.createElement('div');
    cardItem.className = 'card';
    cardItem.id = id;

    const cardImg = document.createElement('img');
    cardImg.className = 'card-img';
    cardImg.src = `./assets/img/products/${id}.png`;

    const cardTitle = document.createElement('h3');
    cardTitle.className = 'card-title';
    cardTitle.innerHTML = `${name}`;

    const cardBrand = document.createElement('p');
    cardBrand.className = 'card-subtitle';
    cardBrand.classList.add('card-brand');
    cardBrand.innerHTML = `${manufacturer}`;

    const cardTextBlock = document.createElement('div');
    cardTextBlock.className = 'card-text-block';

    const cardSize = document.createElement('p');
    cardSize.className = 'card-text';
    cardSize.classList.add('card-size');
    cardSize.innerHTML = `размер: ${size}`;

    const cardPrice = document.createElement('p');
    cardPrice.className = 'card-text';
    cardPrice.classList.add('card-price');
    cardPrice.innerHTML = `${price} руб.`;

    cardTextBlock.appendChild(cardSize);
    cardTextBlock.appendChild(cardPrice);

    const cardBtn = document.createElement('button');
    cardBtn.className = 'card-btn';
    cardBtn.id = `${id}`;
    cardBtn.innerHTML = 'Купить'

    cardItem.appendChild(cardImg);
    cardItem.appendChild(cardTitle);
    cardItem.appendChild(cardBrand);
    cardItem.appendChild(cardTextBlock);
    cardItem.appendChild(cardBtn);

    block.insertAdjacentElement('beforeend', cardItem)
}
