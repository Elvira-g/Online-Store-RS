
import Card from './Card';
import addToCart from './functions';

const filtersFunc = (data) => { 
    const block = document.querySelector('.cards-block');
    const filterBtns = document.querySelectorAll('.filter-btn');
    // const rangeLine = document.querySelector('#price');
    // const rangeMin = document.querySelector('.sorting-price-min');
    // const rangeMax = document.querySelector('.sorting-price-max');
    const searchInput = document.querySelector('.search-input');
    const clearSearchBtn = document.querySelector('.search-clear-btn');
    // let checkedFilters;
    // localStorage.setItem('checkedFilters',JSON.stringify({}))

    // console.log(localStorage.checkedFilters)
    // console.log(localStorage.sets)
;

    let sliderOne = document.getElementById("slider-1");
    let sliderTwo = document.getElementById("slider-2");
    let displayValOne = document.getElementById("range1");
    let displayValTwo = document.getElementById("range2");
    let minGap = 0;
    let sliderTrack = document.querySelector(".slider-track");
    let sliderMaxValue;

    let newProducts = [];
    let allPrices = [];
    let isSorted = false;

    let allFilters = {
        years: [],
        manufacturer: [],
        size: [],
        gender: [],
        color: [],
        price: [],
    }

    if (localStorage.checkedFilters == undefined) {
        // checkedFilters = JSON.parse(localStorage.checkedFilters);
    } else {
        let checkedFilters = JSON.parse(localStorage.checkedFilters);
        for ( let key in checkedFilters ) {
            if ( checkedFilters[key].length > 0 ) {
                let filters = checkedFilters[key];
                filters.forEach((filter) => {
                    allFilters[key].push(filter)
                })
            }
        }
        // showFilteredProducts(allFilters);
    }
    showFilteredProducts(allFilters);

    setDefaultPrices();

    filterBtns.forEach((filterBtn) => {
        filterBtn.addEventListener('click', (e) => {
            // console.log(allFilters);
            if ( filterBtn.classList.contains('filter-reset-btn') ) {
                allFilters.years = [];
                allFilters.manufacturer = [];
                allFilters.size = [];
                allFilters.gender = [];
                allFilters.color = [];
                allFilters.price = [];
                if (isSorted) {
                    sortByPrice();
                }
                filterBtns.forEach((btn) =>  {
                    btn.classList.remove('active-filter');
                })
                setDefaultPrices();

            } else {
                const filter = filterBtn.id;
                const category = filterBtn.parentNode.dataset.filter;

                for ( let key in allFilters ) {
                    if ( category === key ) {
                        if ( allFilters[key].includes(filter) ) {
                            const indx = allFilters[key].indexOf(filter);
                            allFilters[key].splice(indx, 1);
                            filterBtn.classList.remove('active-filter');
                        } else {
                            allFilters[key].push(filter);
                            filterBtn.classList.add('active-filter');
                        }
                    }
                }
            }
            showFilteredProducts(allFilters);
        })
    })

    function showFilteredProducts(allFilters, productsArr = data) {
        // console.log(allProducts);
        block.innerHTML = '';
        for (let key in allFilters) {
            let filters = allFilters[key];
            if ( filters.length != 0 ) {
                newProducts = [];
                filters.forEach((filter) => {
                    productsArr.forEach((product) => {
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
            console.log(productsArr)
            const newCards = new Card(block);
            newCards.drawAllCards(productsArr); 
            addToCart();
            localStorage.setItem('checkedFilters',JSON.stringify(allFilters))
        }
    }


    function setDefaultPrices() {
        data.forEach((product) => {
            allPrices.push(product.priceNum);
        })

        let minPrice = Math.min(...allPrices).toString();
        let maxPrice = Math.max(...allPrices).toString(); 
        sliderOne.min = Math.min(...allPrices);
        sliderOne.max = Math.max(...allPrices);
        sliderTwo.min = Math.min(...allPrices);
        sliderTwo.max = Math.max(...allPrices);
        sliderOne.value = minPrice;
        sliderTwo.value = maxPrice;
        console.log(sliderOne.value);
        console.log(sliderTwo.value);
        sliderMaxValue = document.getElementById("slider-1").max;
    
        slideOne();
        slideTwo();
    }


    sliderOne.addEventListener('input', () => {
        slideOne();
        changeSorting()
    })

    sliderTwo.addEventListener('input', () => {
        slideTwo();
        changeSorting()
    })

    function slideOne() {
        if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
            sliderOne.value = parseInt(sliderTwo.value) - minGap;
        }
        displayValOne.textContent = sliderOne.value;
        fillColor();
    
    }
        
    function slideTwo() {
        if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
            sliderTwo.value = parseInt(sliderOne.value) + minGap;
        }
        displayValTwo.textContent = sliderTwo.value;
        fillColor();
    }
        
    
    function fillColor(){
        let percent1 = (parseInt(sliderOne.value)/ parseInt(sliderMaxValue)) * 100;
        let percent2 = (parseInt(sliderTwo.value) / parseInt(sliderMaxValue)) * 100;
        sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , rgb(92, 92, 92) ${percent1}% , rgb(92, 92, 92) ${percent2}%, #dadae5 ${percent2}%)`;
    }

    function changeSorting() {
        let minValue = sliderOne.valueAsNumber;
        let maxValue = sliderTwo.valueAsNumber;
        allFilters.price = [];
        data.forEach((product) => {
            if ( product.priceNum >= minValue && product.priceNum <= maxValue) {
                if ( !allFilters.price.includes(product.priceNum) ) {
                    allFilters.price.push(product.priceNum);
                }        
            }
        })
        if ( isSorted ) {
            sortByPrice();
        }
        showFilteredProducts(allFilters);
    }
    
    
    const selectSingle = document.querySelector('.sortings-items');
    const selectSingle_title = selectSingle.querySelector('.sortings-items-title');
    const selectSingle_labels = selectSingle.querySelectorAll('.sortings-label');

// Toggle menu
    selectSingle_title.addEventListener('click', () => {
        if ('active' === selectSingle.getAttribute('data-state')) {
            selectSingle.setAttribute('data-state', '');
        } else {
            selectSingle.setAttribute('data-state', 'active');
        }
    });

// Close when click to option
    for (let i = 0; i < selectSingle_labels.length; i++) {
    selectSingle_labels[i].addEventListener('click', (evt) => {
        selectSingle_title.textContent = evt.target.textContent;
        selectSingle.setAttribute('data-state', '');
    });
    }

    selectSingle_labels.forEach((item) => {
        item.addEventListener('click', (e) => {
            sortByPrice();
            isSorted = true;
            showFilteredProducts(allFilters)

        })
    })

    function sortByPrice() {
        const chosenSort = selectSingle_title.textContent;
        let priceToSort = [];

        if ( allFilters.price.length != 0 ) {
            priceToSort = allFilters.price;
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
        allFilters.price = filteredPrices;
    }

    let searchText = '';
    let searchedProducts = []
    searchInput.addEventListener('input', () => {
        serchProducts()
    })

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        serchProducts();
    })

    function serchProducts() {
        searchedProducts = [];
        searchText = searchInput.value.toLowerCase();
        data.forEach((card) => {
            const cardName = card.name.replace(/ /g,'').toLowerCase();
            if (cardName.indexOf(searchText) > -1) {
                searchedProducts.push(card);
            }
        })
        showFilteredProducts(allFilters, searchedProducts)
    }

}

export default filtersFunc