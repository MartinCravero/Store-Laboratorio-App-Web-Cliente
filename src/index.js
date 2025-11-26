import { RenderCards } from "./components/cards.js";
import { cartList } from "./components/cartList.js";
import { getProducts } from "./services/api.js";
import { initLocalStorage } from "./storage/storage.js";
import { initCartFooterEvents } from "./components/cartList.js";



initLocalStorage();

getProducts().then((products)=>{
    let inputSearch = document.querySelector('#inputSearch');
    let home = document.querySelector('#home');

    home.addEventListener('click', ()=>{
        inputSearch.value = '';
        return RenderCards(products);
    })

    document.querySelectorAll('[data-category]').forEach(link => {
        link.addEventListener('click', () => {
            const category = link.dataset.category;
            const result = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
            RenderCards(result);
        });
    });




    
    inputSearch.addEventListener('input', (event)=>{
        console.log(event.target.value);
        let query = event.target.value;
        if (query) {
            const result = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
            RenderCards(result);
        } else {
            RenderCards(products);
        }         
    });
    RenderCards(products);     
})

cartList();

initCartFooterEvents();


