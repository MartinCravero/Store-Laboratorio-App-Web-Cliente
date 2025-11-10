import { getProducts } from "../api.js";
import { Modal } from "./modal.js";

export function RenderCards (){
    let productList = document.querySelector('#product-list')
    getProducts().then((products)=>{
        let template = "";
        products.forEach(p => {
            template += `
            <div class="col">
                        <div class="card justify-content-center align-items-center" style="width: 300px;">
                            <img src="${p.image}" class="card-img-top" alt="${p.title}" style="height: 300px; width:250px; object-fit: contain;">
                            <div class="card-body" style="width: 300px;">
                                <h5 class="card-title text-truncate" >${p.title}</h5>
                            </div>
                            <div class="mb-3">
                                <button class="btn btn-dark" id="btn-${p.id}">Más detalles</button>
                            </div>
                        </div>
            </div>`;    
        });
        productList.innerHTML = template;

        //asignando evento onclick a los botones
        products.forEach((p)=>{
            let btn = document.querySelector(`#btn-${p.id}`);
            btn.addEventListener('click', ()=>{
                Modal(p);
            });
        });
    });
}