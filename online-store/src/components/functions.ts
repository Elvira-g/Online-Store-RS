export function drowCard(block: HTMLElement, id: string, name: string, manufacturer: string, price: string, size: string) {

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
    cardBtn.dataset.product = `${id}`;
    cardBtn.innerHTML = 'Купить'

    cardItem.appendChild(cardImg);
    cardItem.appendChild(cardTitle);
    cardItem.appendChild(cardBrand);
    cardItem.appendChild(cardTextBlock);
    cardItem.appendChild(cardBtn);

    block.insertAdjacentElement('beforeend', cardItem);
}

export function addToCart() {
    const btns = document.querySelectorAll('.card-btn') as NodeListOf<HTMLButtonElement>;
    const productsCount = <HTMLDivElement>document.querySelector('.cart-number');
    let count: string[] = [];

    btns.forEach((btn) => {
        btn.addEventListener('click', (e)=> {
            e.preventDefault();
            if ( btn.classList.contains('added') ) {
                btn.innerHTML = 'Купить';
                btn.classList.remove('added');
                count.pop();
                if ( count.length >= 1 ) {
                    productsCount.innerHTML = count.length.toString();
                } else {
                    count = [];
                    productsCount.style.display = 'none';
                }
            } else {
                btn.innerHTML = 'В корзине';
                btn.classList.add('added');
                if (btn.dataset.product) {
                    count.push(btn.dataset.product);
                    productsCount.style.display = 'flex';
                    productsCount.innerHTML = count.length.toString();  
                }
            }
            console.log(count.length)
            console.log(count)
        })
    })
}
