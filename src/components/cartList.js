import { deleteItemStorage, getFromLocalStorage, saveToLocalStorage, setItemToLocalStorage } from "../storage/storage.js";
import { toast } from "./toast.js";

export function cartList(){
    let offcanvasbody = document.querySelector('.offcanvas-body');
    let template = '';
    let dataStorage = getFromLocalStorage();

    dataStorage.forEach((item)=>{
        template += `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4 d-flex justify-content-center aling-items-center">
                    <img src="${item.image}" class="img-fluid rounded-start" style="object-fit: contain; height: 150px" alt="${item.title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">Cantidad: ${item.qtty} unidades</p>
                    </div>
                    <div class="d-flex justify-content-between aling-items-center">
                        <small class="text-body-secondary">Precio $${item.price}</small>
                        <button class="btn btn-outline-danger border-0" id="deleteItem-${item.id}"><i class="bi bi-trash-fill"></i></button>
                    </div>
                </div>
            </div>
        </div>`
        offcanvasbody.innerHTML= template;
    });

    eventsOnClick(dataStorage);
}

export function eventsOnClick(productsStorage){
    productsStorage.forEach((item)=>{
        let btn = document.querySelector(`#deleteItem-${item.id}`);
        btn.addEventListener('click', ()=>{
            deleteItemStorage(item.id);
            toast(`${item.title} eliminado del carrito`, 'danger');
            cartList();
        });
    });
}