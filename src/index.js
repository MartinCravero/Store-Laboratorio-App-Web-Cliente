import { RenderCards } from "./components/cards.js";
import { cartList } from "./components/cartList.js";
import { getProducts } from "./services/api.js";
import { initLocalStorage } from "./storage/storage.js";



initLocalStorage();

getProducts().then((products)=>{
    let inputSearch = document.querySelector('#inputSearch');
    let electronics = document.querySelector('#electronics');
    let jewelery = document.querySelector('#jewelery');
    let mensClothing = document.querySelector('#mens-clothing');
    let womensClothing = document.querySelector('#womens-clothing');
    let home = document.querySelector('#home');

    home.addEventListener('click', ()=>{
        return RenderCards(products);
    })

    electronics.addEventListener('click', ()=>{
        let result = products.filter((p)=> p.category === "electronics");
        return RenderCards(result);
    })

    jewelery.addEventListener('click', ()=>{
        let result = products.filter((p)=> p.category === "jewelery");
        return RenderCards(result);
    })

    mensClothing.addEventListener('click', ()=>{
        let result = products.filter((p)=> p.category === "men's clothing");
        return RenderCards(result);
    })

    womensClothing.addEventListener('click', ()=>{
        let result = products.filter((p)=> p.category === "women's clothing");
        return RenderCards(result);
    })



    
    inputSearch.addEventListener('input', (event)=>{
        console.log(event.target.value);
        let query = event.target.value;
        if (query !== ''){
            let result = products.filter(p => p.title.toLoweCase().includes(query.toLoweCase()))
            return RenderCards(result);
        }          
    });
    RenderCards(products);     
})
cartList();


