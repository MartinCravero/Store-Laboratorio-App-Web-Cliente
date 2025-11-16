import { getFromLocalStorage, saveToLocalStorage, setItemToLocalStorage } from "../storage/storage.js";
import { addEventListener, contador } from "./contador.js";

export function Modal (prod){

    let container = document.querySelector('#productModal');

    let template =`
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${prod.title}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <img src="${prod.image}" class="img-fluid" alt="${prod.title}">
                    </div>
                    <div class="col-md-6 d-flex justify-content-center aling-items-center">
                        <div class="d-flex flex-column gap-3">
                            <p>${prod.description}</p>
                            <p style="width:150px">
                                Precio:<small> USD $${prod.price}</small>
                            </p>
                            ${contador(prod.id)}  
                        </div>
                    </div>     
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="addToCartBtn-${prod.id}">Agregar a carrito</button>
            </div>
        </div>
    </div>`;


    container.innerHTML = template;
    const bootstrapModal = new bootstrap.Modal(container);
    bootstrapModal.show();

    addEventListener(prod.id, 1);
    let btnAddToCart = document.querySelector(`#addToCartBtn-${prod.id}`);
    btnAddToCart.addEventListener('click', ()=> {
        prod.qtty = ++document.querySelector(`#contador-${prod.id}`).textContent;
        let dataStorage = getFromLocalStorage();
        let filtered = dataStorage.filter((p)=> p.id !== prod.id);
        filtered.push(prod);
        setItemToLocalStorage(filtered);
        // saveToLocalStorage(prod);
    })
}