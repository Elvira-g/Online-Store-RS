import { Card } from './Card';
import data from './products';
import { ICard } from './interfaces';
import {IFilters} from './interfaces'


// block: HTMLElement, id: string | number | boolean, name: string | number | boolean, manufacturer: string | number | boolean, price: string | number | boolean, size: string | number | boolean, count: string | number | boolean, year: string | number | boolean
export function drowCard(block: HTMLElement, card: ICard) {

    const cardItem = document.createElement('div');
    cardItem.className = 'card';
    cardItem.id = card.id;

    const cardImg = document.createElement('img');
    cardImg.className = 'card-img';
    cardImg.src = `./assets/img/products/${card.id}.png`;

    const cardTitle = document.createElement('h3');
    cardTitle.className = 'card-title';
    cardTitle.innerHTML = `${name}`;

    const cardBrand = document.createElement('p');
    cardBrand.className = 'card-subtitle';
    cardBrand.classList.add('card-brand');
    cardBrand.innerHTML = `${card.manufacturer} / ${card.year}`;

    const cardTextBlock = document.createElement('div');
    cardTextBlock.className = 'card-text-block';

    const cardSize = document.createElement('p');
    cardSize.className = 'card-text';
    cardSize.classList.add('card-size');
    cardSize.innerHTML = `размер: ${card.size}`;

    const cardPrice = document.createElement('p');
    cardPrice.className = 'card-text';
    cardPrice.classList.add('card-price');
    cardPrice.innerHTML = `Стоимость: ${card.price} руб.`;

    const cardCount = document.createElement('p');
    cardCount.className = 'card-text';
    cardCount.classList.add('card-count');
    cardCount.innerHTML = `Количество: ${card.count}`;

    cardTextBlock.appendChild(cardSize);
    cardTextBlock.appendChild(cardPrice);
    cardTextBlock.appendChild(cardCount);

    const cardBtn = document.createElement('button');
    cardBtn.className = 'card-btn';
    cardBtn.dataset.product = `${card.id}`;
    cardBtn.innerHTML = 'Купить';


        if (localStorage.addedToCart == undefined) {
            console.log('no addedToCart storage')
        } else {
            const addedCadrs: string[] = JSON.parse(localStorage.addedToCart);
            addedCadrs.forEach((item) => {
                if ( item == card.id ) {
                    cardBtn.classList.add('added');
                    cardBtn.innerHTML = 'В корзине';
                }
            })
        }

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
    if (localStorage.addedToCart == undefined) {
        console.log('no addedToCart storage')
    } else {
        let addedProducts: string[] = JSON.parse(localStorage.addedToCart);
        console.log(addedProducts);
        if (addedProducts.length > 0 ) {
            count = JSON.parse(localStorage.addedToCart);
            productsCount.style.display = 'flex';
            productsCount.innerHTML = addedProducts.length.toString();
        } 
    }

    btns.forEach((btn) => {
        btn.addEventListener('click', (e)=> {
            // e.preventDefault();
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
                if ( count.length == 10 ) {
                    alert('Извините, в корзине не может быть более 10 товаров');
                    return;
                } else {
                    btn.innerHTML = 'В корзине';
                    btn.classList.add('added');
                    if (btn.dataset.product) {
                        count.push(btn.dataset.product);
                        productsCount.style.display = 'flex';
                        productsCount.innerHTML = count.length.toString();  
                    }
                }
            }
            console.log(count)
            localStorage.setItem('addedToCart',JSON.stringify(count))
        })
    })

}

export function showFilteredProducts(block: HTMLElement, allFilters: IFilters, productsArr: ICard[]) {
    block.innerHTML = '';
    for (let key in allFilters) {
        let filters: number[] | string[] = allFilters[key];
        if ( filters.length != 0 ) {
            let newProducts: ICard[] = [];
            filters.forEach((filter: string | number) => {
                productsArr.forEach((product: ICard) => {
                    for ( let key in product ) {
                        if ( product[key] === filter ) {
                            newProducts.push(product)
                        }
                    }
                })
            })
            productsArr = newProducts;
        }
    }
    if ( productsArr.length == 0 ) {
        block.innerHTML = 'Нет товаров по выбранным категориям';
    } else {
        const newCards = new Card(block);
        newCards.drawAllCards(productsArr); 
        addToCart();
        localStorage.setItem('checkedFilters',JSON.stringify(allFilters))
    }
}

export function setDefaultPrices(allPrices: number[], sliderOne: HTMLInputElement, sliderTwo: HTMLInputElement) {
    data.forEach((product) => {
        allPrices.push(product.priceNum);
    })

    let minPrice = Math.min(...allPrices).toString();
    let maxPrice = Math.max(...allPrices).toString(); 
    sliderOne.min = Math.min(...allPrices).toString();
    sliderOne.max = Math.max(...allPrices).toString();
    sliderTwo.min = Math.min(...allPrices).toString();
    sliderTwo.max = Math.max(...allPrices).toString();
    sliderOne.value = minPrice;
    sliderTwo.value = maxPrice;
    console.log(sliderOne.value);
    console.log(sliderTwo.value);
    // let sliderMaxValue = sliderOne.max;

    slideOne(sliderOne,sliderTwo);
    slideTwo(sliderOne,sliderTwo);
}

export function slideOne(sliderOne: HTMLInputElement, sliderTwo: HTMLInputElement) {
    const displayValOne = <HTMLElement>document.getElementById("range1");
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= 0){
        sliderOne.value = parseInt(sliderTwo.value).toString();
    }
    displayValOne.textContent = sliderOne.value;
    fillColor(sliderOne.value,sliderTwo.value);

}
    
export function slideTwo(sliderOne: HTMLInputElement, sliderTwo: HTMLInputElement) {
    const displayValTwo = <HTMLElement>document.getElementById("range2");
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= 0){
        sliderTwo.value = parseInt(sliderOne.value).toString();
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor(sliderOne.value,sliderTwo.value);
}

export function fillColor(sliderOne: string, sliderTwo: string){
    let sliderValue = <HTMLInputElement>document.getElementById("slider-1");
    let sliderTrack = <HTMLElement>document.querySelector(".slider-track");
    let sliderMaxValue = sliderValue.max;
    let percent1 = (parseInt(sliderOne)/ parseInt(sliderMaxValue)) * 100;
    let percent2 = (parseInt(sliderTwo) / parseInt(sliderMaxValue)) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , rgb(92, 92, 92) ${percent1}% , rgb(92, 92, 92) ${percent2}%, #dadae5 ${percent2}%)`;
}

export function changeSorting(block: HTMLElement, isSorted: boolean, sliderOne: HTMLInputElement, sliderTwo: HTMLInputElement, allFilters: IFilters) {
    let minValue = sliderOne.valueAsNumber;
    let maxValue = sliderTwo.valueAsNumber;
    allFilters.price = [];
    data.forEach((product) => {
        if ( product.priceNum >= minValue && product.priceNum <= maxValue) {
            if ( !allFilters.priceNum.includes(product.priceNum) ) {
                allFilters.price.push(product.price);
            }        
        }
    })
    if ( isSorted ) {
        sortByPrice(allFilters);
    }
    showFilteredProducts(block, allFilters, data);
}

export function sortByPrice(allFilters: IFilters) {
    const selectSingle = <HTMLElement>document.querySelector('.sortings-items');
    const selectSingle_title = <HTMLElement>selectSingle.querySelector('.sortings-items-title');
    // const selectSingle_labels = selectSingle.querySelectorAll('.sortings-label');

    const chosenSort = selectSingle_title.textContent;
    let priceToSort: number[] = [];

    if ( allFilters.priceNum.length != 0 ) {
        priceToSort = allFilters.priceNum;
    } else {
        data.forEach((product) => {
            priceToSort.push(product.priceNum);
        })
    }
    let filteredPrices = priceToSort.filter((item, index) => priceToSort.indexOf(item) === index)
    if ( chosenSort == 'сначала дешевые' ) {
        filteredPrices.sort((prev, next) => prev - next );
    }
    if ( chosenSort == 'сначала дорогие' ) {
        filteredPrices.sort((prev, next) => next - prev );
    }
    allFilters.priceNum = filteredPrices;
}

export function serchProducts(block: HTMLElement, allFilters: IFilters, searchInput: HTMLInputElement) {
    let searchText: string = '';
    let searchedProducts: ICard[] = [];
    searchText = searchInput.value.toLowerCase();
    data.forEach((card) => {
        const cardName: string = card.name.replace(/ /g,'').toLowerCase();
        if (cardName.indexOf(searchText) > -1) {
            searchedProducts.push(card);
        }
    })
    showFilteredProducts(block, allFilters, searchedProducts)
}

export default addToCart