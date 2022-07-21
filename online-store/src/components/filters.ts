
import {showFilteredProducts, showPopularProducts, setDefaultPrices, slideOne, slideTwo, changeSorting, sortByPrice, serchProducts} from './functions';
import { IFilters, ICard } from './interfaces';

const filtersFunc = (data: ICard[]) => { 
    const block = <HTMLElement>document.querySelector('.cards-block');
    const filterBtns = document.querySelectorAll('.filter-btn') as NodeListOf<HTMLButtonElement>;
    const searchInput = <HTMLInputElement>document.querySelector('.search-input');
    const clearSearchBtn = <HTMLButtonElement>document.querySelector('.search-clear-btn');

    let sliderOne = <HTMLInputElement>document.getElementById("slider-1");
    let sliderTwo = <HTMLInputElement>document.getElementById("slider-2");
    let allPrices: number[] = [];
    let isSorted: boolean = false;
    let isPopular: boolean = false;

    let allFilters: IFilters = {
        'years': [],
        'manufacturer': [],
        'size': [],
        'gender': [],
        'color': [],
        'price': [],
        'priceNum': [],
    }

    //get information from local storage
    if (localStorage.checkedFilters == undefined) {

    } else {
        let checkedFilters: {[key: string]: string[]} = JSON.parse(localStorage.checkedFilters);
        for ( let key in checkedFilters ) {
            if ( checkedFilters[key].length > 0 ) {
                let filters: string[] = checkedFilters[key];
                filters.forEach((filter: string) => {
                    if ( key === 'years' || 
                        key === 'manufacturer' || 
                        key === 'size' ||
                        key === 'gender' ||
                        key === 'color' ||
                        key === 'price') {    
                            allFilters[key].push(filter)  
                    }
                    
                })
            }
        }
    }
    for ( let key in allFilters ) {
        let filters = allFilters[key];
        filters.forEach((filter: string | number) => {
            filterBtns.forEach((btn) => {
                if ( btn.id == filter.toString() ) {
                    btn.classList.add('active-filter');
                }
            })
        })
    }

    showFilteredProducts(block, allFilters, data);

    setDefaultPrices(allPrices, sliderOne, sliderTwo);

    //set function on filters click
    filterBtns.forEach((filterBtn) => {
        filterBtn.addEventListener('click', (e) => {
            if ( filterBtn.classList.contains('filter-reset-btn') ) {
                allFilters.years = [];
                allFilters.manufacturer = [];
                allFilters.size = [];
                allFilters.gender = [];
                allFilters.color = [];
                allFilters.price = [];
                if (isSorted) {
                    isSorted = false;
                    sortByPrice(allFilters);
                }
                filterBtns.forEach((btn) =>  {
                    btn.classList.remove('active-filter');
                })
                if ( isPopular ) {
                    isPopular = false;
                }
                setDefaultPrices(allPrices, sliderOne, sliderTwo);

            } else if ( filterBtn.classList.contains('filter-popular-block') ) {
                if ( isSorted ) {
                    sortByPrice(allFilters)
                }
                if ( filterBtn.classList.contains('active-filter') ) {
                    filterBtn.classList.remove('active-filter');
                    showFilteredProducts(block, allFilters, data);
                    isPopular = false
                } else {
                    filterBtn.classList.add('active-filter');
                    showPopularProducts(block, allFilters, data);
                    isPopular = true
                }
                
            } else {
                const filter: string = filterBtn.id;
                const filteredCategory = <HTMLButtonElement>filterBtn.parentElement;
                let category: string = '';
                if (filteredCategory.dataset.filter != undefined) {
                    category = filteredCategory.dataset.filter; 
                }

                for ( let key in allFilters ) {
                    if ( category === key ) {
                        if ( key === 'years' || 
                        key === 'manufacturer' || 
                        key === 'size' ||
                        key === 'gender' ||
                        key === 'color' ||
                        key === 'price') {
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
            }
            if ( isSorted ) {
                sortByPrice(allFilters)
            }
            if ( isPopular ) {
                showPopularProducts(block, allFilters, data)
            } else {
                showFilteredProducts(block, allFilters, data);
            }
            
        })
    })

    //price slider function
    sliderOne.addEventListener('input', () => {
        slideOne(sliderOne, sliderTwo);
        changeSorting(block, isSorted, isPopular, sliderOne, sliderTwo, allFilters)
    })

    sliderTwo.addEventListener('input', () => {
        slideTwo(sliderOne, sliderTwo);
        changeSorting(block, isSorted, isPopular, sliderOne, sliderTwo, allFilters)
    })

    //Price sorting menu
    const selectSingle = <HTMLElement>document.querySelector('.sortings-items');
    const selectSingle_title = <HTMLDivElement>selectSingle.querySelector('.sortings-items-title');
    const selectSingle_labels = selectSingle.querySelectorAll('.sortings-label') as NodeListOf<HTMLElement>;

    selectSingle_title.addEventListener('click', () => {
        isSorted = true;
        if ('active' === selectSingle.getAttribute('data-state')) {
            selectSingle.setAttribute('data-state', '');
        } else {
            selectSingle.setAttribute('data-state', 'active');
        }
    });

    for (let i = 0; i < selectSingle_labels.length; i++) {
    selectSingle_labels[i].addEventListener('click', (evt) => {
        const selectedFilter = <HTMLElement>evt.target;
        selectSingle_title.textContent = selectedFilter.textContent;
        selectSingle.setAttribute('data-state', '');
    });
    }

    selectSingle_labels.forEach((item) => {
        item.addEventListener('click', (e) => {
            sortByPrice(allFilters);
            isSorted = true;
            if ( isPopular ) {
                showPopularProducts(block, allFilters, data)
            } else {
                showFilteredProducts(block, allFilters, data)
            }
            

        })
    })

    //searching block
    searchInput.addEventListener('input', () => {
        serchProducts(block, allFilters, searchInput,)
    })

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        serchProducts(block, allFilters, searchInput,);
    })

}

export default filtersFunc